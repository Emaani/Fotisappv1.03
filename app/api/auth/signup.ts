import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
      }

      try {
        // Check if user already exists
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
        if (existingUser.rows.length > 0) {
          return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database
        const newUser = await db.query(
          'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
          [username, email, hashedPassword]
        );

        // Create JWT token for authentication
        const token = jwt.sign({ userId: newUser.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

        // Send the token and user data to the frontend
        res.status(201).json({
          message: 'User signed up successfully',
          token,
          user: {
            id: newUser.rows[0].id,
            username: newUser.rows[0].username,
            email: newUser.rows[0].email
          }
        });
      } catch (err) {
        console.error('Error in signup:', err);
        res.status(500).json({ message: 'An error occurred during signup' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
}
