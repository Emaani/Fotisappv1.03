// app/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { createUser, findUserByEmail } from './userService'; // Adjust the path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if user exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password and create the user
    const hashedPassword = await hash(password, 10);
    const user = await createUser({ email, password: hashedPassword });

    // Respond with success
    return res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'An error occurred during signup.' });
  }
}
