import { NextRequest, NextResponse } from 'next/server'
import { verify } from '@/lib/token'
import { prisma } from '@/lib/prisma'

interface TokenPayload {
  userId: string
  slotKey: string
  url: string
  exp?: number
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  const secret = process.env.REDIRECT_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const payload = verify(token, secret) as TokenPayload | null

  if (!payload || !payload.userId || !payload.slotKey || !payload.url) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  }

  // Insert click tracking
  try {
    await prisma.click.create({
      data: {
        userId: payload.userId,
        slotKey: payload.slotKey,
      },
    })
  } catch (error) {
    // Log error but don't fail the redirect
    console.error('Failed to track click:', error)
  }

  // 302 redirect to the target URL
  return NextResponse.redirect(payload.url, { status: 302 })
}

