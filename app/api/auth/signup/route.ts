import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import db from '@/server/config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'Username, email, and password are required' }, { status: 400 });
  }

  try {
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: 'User with this email or username already exists' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const token = sign({ userId: newUser.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({
      message: 'User signed up successfully',
      token,
      user: {
        id: newUser.rows[0].id,
        username: newUser.rows[0].username,
        email: newUser.rows[0].email
      }
    }, { status: 201 });
  } catch (err) {
    console.error('Error in signup:', err);
    return NextResponse.json({ message: 'An error occurred during signup' }, { status: 500 });
  }
}