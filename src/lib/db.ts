import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma's own error/warn logging is silenced because the data layer
// (src/lib/data.ts) wraps every read in a try/catch and handles DB
// unavailability gracefully. Without this, the build output on Vercel
// is polluted with `prisma:error` lines when the SQLite file is absent.
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV !== 'production' ? ['warn'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db