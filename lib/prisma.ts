import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use SUPABASE_POSTGRES_PRISMA_URL if available (for Supabase), otherwise DATABASE_URL
const databaseUrl = process.env.SUPABASE_POSTGRES_PRISMA_URL || process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL or SUPABASE_POSTGRES_PRISMA_URL environment variable')
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

