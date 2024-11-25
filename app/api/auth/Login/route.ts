import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '@/app/api/auth/userService';
import prisma from '@/app/lib/prisma';
import { setAuthCookies } from '@/server/utils/authUtils';

// Environment variables for secrets
const TOKEN_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
const ACCESS_TOKEN_EXPIRATION = '24h'; // Default expiration
const REFRESH_TOKEN_EXPIRATION = '7d'; // Refresh token expiration

// Schema for request validation
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

// Function to create an access token
function createToken(userId: string, email: string, duration: string) {
  return jwt.sign({ userId, email }, TOKEN_SECRET, { expiresIn: duration });
}

// Function to create a refresh token
function createRefreshToken(userId: string) {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
}

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validatedData = loginSchema.parse(body);

    // Check if the user exists
    const user = await findUserByEmail(validatedData.email);
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Generate tokens
    const tokenDuration = validatedData.rememberMe ? '30d' : ACCESS_TOKEN_EXPIRATION;
    const token = createToken(user.id, user.email, tokenDuration);
    const refreshToken = createRefreshToken(user.id);

    // Store refresh token in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Create a response object
    const response = NextResponse.json({
      token,
      userId: user.id,
      isProfileComplete: !!user.profile,
      message: 'Login successful',
    });

    // Set auth cookies
    setAuthCookies(response, token, refreshToken, validatedData.rememberMe);

    return response;
  } catch (error) {
    console.error('Login error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Validation error',
          errors: error.errors.map((err) => ({ field: err.path[0], message: err.message })),
        },
        { status: 400 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
