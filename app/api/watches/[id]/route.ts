import { NextRequest, NextResponse } from 'next/server'
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getMockUserId(request)
    const watchId = params.id

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

    // Verify the watch belongs to the user
    const watch = await prisma.watch.findUnique({
      where: { id: watchId },
    })

    if (!watch) {
      return NextResponse.json({ error: 'Watch not found' }, { status: 404 })
    }

    if (watch.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await prisma.watch.delete({
      where: { id: watchId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting watch:', error)
    return NextResponse.json(
      { error: 'Failed to delete watch' },
      { status: 500 }
    )
  }
}

