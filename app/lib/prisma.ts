import { PrismaClient } from '@prisma/client';

declare global {
  // Extending the NodeJS global interface for `prisma`
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

// Declare and initialize Prisma client
const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Enable logging
});

// Assign to global if not in production to avoid multiple instances
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// Ensure export compatibility
export default prisma;
