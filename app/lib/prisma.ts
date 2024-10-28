// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Prevents TypeScript from erroring on the global prisma variable
  const prisma: PrismaClient | undefined;  // Changed var to const
  interface Global {
    prisma: PrismaClient | undefined;  // Added this line to extend the global interface
  }
}

const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],  // Optional: Adds logging for easier debugging
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
