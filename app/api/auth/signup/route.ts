import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import  prisma  from '@/app/lib/prisma'
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      }
    })

    // Return user ID for profile setup
    return NextResponse.json({
      message: 'User created successfully',
      userId: user.id
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}