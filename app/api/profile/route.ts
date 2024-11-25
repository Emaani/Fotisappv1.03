import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { z } from "zod";

// Validation Schema
const profileSchema = z.object({
  userId: z.string().transform(Number),
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const validatedData = profileSchema.parse(Object.fromEntries(formData));

    // Check if profile already exists
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: validatedData.userId },
    });

    if (existingProfile) {
      return NextResponse.json({ error: "Profile already exists for this user" }, { status: 400 });
    }

    // Handle profile picture upload
    let profilePictureUrl = null;
    const profilePicture = formData.get('profilePicture') as File | null;
    if (profilePicture) {
      // Here you would typically upload the file to a storage service
      // and get back a URL. For this example, we'll just use a placeholder.
      profilePictureUrl = '/placeholder-profile-picture.jpg';
    }

    // Create profile
    const profile = await prisma.profile.create({
      data: {
        userId: validatedData.userId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phoneNumber: validatedData.phoneNumber,
        address: validatedData.address,
        city: validatedData.city,
        country: validatedData.country,
        profilePicture: profilePictureUrl,
        profileCompleted: true,
      },
    });

    // Initialize wallet
    await prisma.wallet.create({
      data: {
        userId: validatedData.userId,
        balance: 0.0,
        currency: "USD",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile created and wallet initialized successfully",
      profile,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating profile and wallet:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
