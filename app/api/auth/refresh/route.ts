import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/app/lib/prisma';
import { setAuthCookies, createToken } from '@/server/utils/authUtils';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;
    if (!refreshToken) {
      return NextResponse.json({ message: 'Refresh token not found' }, { status: 401 });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { userId: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
    }

    const newToken = createToken(user.id, user.email);

    const response = NextResponse.json({ token: newToken, message: 'Token refreshed successfully' });
    setAuthCookies(response, newToken, refreshToken);

    return response;

  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
  }
}
