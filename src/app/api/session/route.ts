// app/api/session/route.ts
import {NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function GET() {
    const session = await auth.api.getSession({
      headers: await headers()
    })
  if (!session) return NextResponse.json(null, { status: 401 })
  return NextResponse.json(session.user)
}
