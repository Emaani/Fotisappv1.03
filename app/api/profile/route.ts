import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { validateJWT } from "@/app/middleware/validateJWT";

export async function POST(req: NextRequest) {
  const validation = await validateJWT(req);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 401 });
  }

  const userId = validation.payload?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const profilePicture = formData.get("profilePicture") as File | null;

    // Logic to process form data and create/update the profile

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        profilePicture: profilePicture ? "/placeholder-profile.jpg" : undefined,
        ...Object.fromEntries(formData.entries()), // Additional form fields
      },

      create: {
        userId,
        profilePicture: profilePicture ? "/placeholder-profile.jpg" : null,
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    );
  }
}
