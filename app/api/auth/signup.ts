// /app/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';  // For password hashing
import { PrismaClient } from '@prisma/client';  // Assuming you're using Prisma, adjust if you're using another DB library

const prisma = new PrismaClient();

export default async function signupHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validate email and password input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user in the database
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      // Return success response
      return res.status(201).json({ message: 'Signup successful', user: newUser });
    } catch (error) {
      console.error('Error signing up user:', error);
      return res.status(500).json({ message: 'Signup failed, try again later.' });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
