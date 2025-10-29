import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// TODO: Replace with real authentication (Telegram or email magic link)
function getMockUserId(request: NextRequest): string {
  const header = request.headers.get('x-mock-user-id')
  if (header) {
    return header
  }
  // Fallback to a constant mock user ID for development
  return 'mock-user-id'
}

const watchSchema = z.object({
  venueSlug: z.string().min(1),
  partySize: z.number().int().positive(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  slot: z.enum(['morning', 'afternoon', 'evening', 'all']),
})

export async function GET(request: NextRequest) {
  try {
    const userId = getMockUserId(request)

    // TODO: Replace with real authentication
    // Get or create user for mock auth
    let user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      user = await prisma.user.create({
        data: { id: userId },
      })
    }

    const watches = await prisma.watch.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(watches)
  } catch (error) {
    console.error('Error fetching watches:', error)
    return NextResponse.json(
      { error: 'Failed to fetch watches' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getMockUserId(request)
    const body = await request.json()

    // Validate request body
    const validated = watchSchema.parse(body)

    // TODO: Replace with real authentication
    // Get or create user for mock auth
    let user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      user = await prisma.user.create({
        data: { id: userId },
      })
    }

    const watch = await prisma.watch.create({
      data: {
        userId: user.id,
        venueSlug: validated.venueSlug,
        partySize: validated.partySize,
        startDate: new Date(validated.startDate),
        endDate: new Date(validated.endDate),
        slot: validated.slot,
      },
    })

    return NextResponse.json(watch, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating watch:', error)
    return NextResponse.json(
      { error: 'Failed to create watch' },
      { status: 500 }
    )
  }
}

