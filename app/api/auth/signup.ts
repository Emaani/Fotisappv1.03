// Import bcrypt for password hashing and JWT for authentication tokens
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import db from '@/server/config/db';
import { NextApiRequest, NextApiResponse } from 'next'; // Assuming db is your PostgreSQL instance
// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

//export handler fucntion

export default function signup(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      // Handle signup logic
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      // Your user creation logic (e.g., database interaction)
      // Example response
      return res.status(200).json({ message: 'User signed up successfully' });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  }

// User Signup Function
export const signupUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database
        const newUser = await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );

        // Create JWT token for authentication
        const token = jwt.sign({ userId: newUser.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

        // Send the token to the frontend
        res.status(201).json({ token, user: newUser.rows[0] });
    } catch (err: unknown) { // Changed 'any' to 'unknown'
        if (err instanceof Error) { // Type guard to check if 'err' is an instance of Error
            res.status(500).json({ message: 'An error occurred during signup', error: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
