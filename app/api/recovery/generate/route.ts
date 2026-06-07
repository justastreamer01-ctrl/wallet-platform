import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { generateMnemonic } from 'bip39'

export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const authHeader = req.headers.get('authorization')

    if (!authHeader) {
      return NextResponse.json(
        { error: 'No auth header' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')

    const {
      data: { user },
    } = await supabase.auth.getUser(token)

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: wallet } = await supabase
      .from('wallets')
      .select('recovery_phrase_generated')
      .eq('user_id', user.id)
      .single()

    if (wallet?.recovery_phrase_generated) {
      return NextResponse.json(
        { error: 'Already generated' },
        { status: 400 }
      )
    }

    // 🔥 REAL 12 WORD PHRASE
    const phrase = generateMnemonic(128)

    const hash = await bcrypt.hash(phrase, 12)

    await supabase
      .from('wallets')
      .update({
        recovery_phrase_hash: hash,
        recovery_phrase_generated: true,
      })
      .eq('user_id', user.id)

    return NextResponse.json({
      phrase,
    })
  } catch (err: any) {
    console.error(err)

    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    )
  }
}