import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '@/app/api/auth/userService';
import prisma from '@/app/lib/prisma';
import { setAuthCookies, createToken, createRefreshToken } from '@/server/utils/authUtils';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = loginSchema.parse(body);

    const user = await findUserByEmail(validatedData.email);
    if (!user || !(await bcrypt.compare(validatedData.password, user.password))) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const token = createToken(user.id, user.email, validatedData.rememberMe ? '30d' : '24h');
    const refreshToken = createRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    const response = NextResponse.json({
      token,
      userId: user.id,
      isProfileComplete: !!user.profile,
      message: 'Login successful',
    });

    setAuthCookies(response, token, refreshToken, validatedData.rememberMe);

    return response;

  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
