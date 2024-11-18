import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const createToken = (userId: number, email: string, expiresIn = '24h') => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET!, { expiresIn });
};

export const createRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '60d' });
};

export const setAuthCookies = (response: NextResponse, token: string, refreshToken: string, rememberMe?: boolean) => {
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge,
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 24 * 60 * 60,
  });
};
