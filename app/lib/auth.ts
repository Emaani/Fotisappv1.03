//app/lib/auth.ts


import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextAuthOptions } from '@next-auth/types';

import CredentialsProvider from 'next-auth/providers/credentials';

export async function getUser() {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return verified.payload;
  } catch {
    return null;
  }
}

// Define authOptions for NextAuth integration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Custom logic to verify the user (replace with real authentication logic)
        const { email, password } = credentials ?? {};
        if (email === 'admin@example.com' && password === 'securepassword') {
          return { id: '1', name: 'Admin', email };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user = token?.user ?? null;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export default authOptions;

