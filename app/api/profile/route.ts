// app/api/profile/setup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { z } from 'zod';

// Validation schema for profile data
const profileSchema = z.object({
  userId: z.string().transform((val) => parseInt(val)),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const profileData = Object.fromEntries(formData.entries());

    // Validate the data
    const validatedData = profileSchema.parse(profileData);

    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { id: validatedData.userId }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Create or update profile
    const profile = await prisma.profile.upsert({
      where: {
        userId: validatedData.userId,
      },
      update: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phoneNumber: validatedData.phoneNumber,
        address: validatedData.address,
        city: validatedData.city,
        country: validatedData.country,
      },
      create: {
        userId: validatedData.userId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phoneNumber: validatedData.phoneNumber,
        address: validatedData.address,
        city: validatedData.city,
        country: validatedData.country,
      },
    });

    // Return success response with redirect URL
    return NextResponse.json({
      success: true,
      profile,
      redirectUrl: '/TradeCommodities'
    });

  } catch (error) {
    console.error('Profile setup error:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { success: false, error: 'Failed to save profile' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
