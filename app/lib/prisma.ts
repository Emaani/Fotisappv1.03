// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Extend NodeJS global interface to include the prisma client
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

// Initialize Prisma Client once and assign it to global in development
const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : [], // Enable logging only in development
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma; // Avoid creating multiple instances in development
}

export default prisma;
