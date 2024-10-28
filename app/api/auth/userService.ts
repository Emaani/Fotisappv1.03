// app/api/auth/userService.ts
import prisma from '@/app/lib/prisma';
import { Prisma } from '@prisma/client';

export const findUserByEmail = async (email: string) => {
  if (!prisma) {
    console.error("Prisma client is not initialized.");
    throw new Error("Prisma client is not initialized.");
  }

  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw new Error(`Error retrieving user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const createUser = async (userData: { email: string; password: string }) => {
  if (!prisma) {
    console.error("Prisma client is not initialized.");
    throw new Error("Prisma client is not initialized.");
  }

  try {
    return await prisma.user.create({
      data: userData,
    });
  } catch (error) {
    console.error("Error in createUser:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new Error("User with this email already exists");
    }

    throw new Error(`Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
