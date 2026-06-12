'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [sent, setSent] =
    useState(false)

  async function handleReset() {

    if (!email) {
      alert('Please enter your email')
      return
    }

    setLoading(true)

    const origin =
      window.location.origin

    const { error } =
      await supabase.auth
        .resetPasswordForEmail(
          email,
          {
            redirectTo:
              `${origin}/reset-password`
          }
        )

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    setSent(true)
  }

  return (
    <div
      style={{
        maxWidth: 420,
        margin: '60px auto',
        padding: 20,
      }}
    >

      <h1>Forgot Password?</h1>

      <p>
        Enter your Swyft access account's email and we’ll send
        you a reset link.
      </p>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: '100%',
          padding: 12,
          marginTop: 10,
          marginBottom: 10,
        }}
      />

      <button
        onClick={handleReset}
        disabled={loading}
        style={{
            background: '#111',
            color: '#fff',
            width: '100%',
          padding: 12,

          }}


      >
        {loading
          ? 'Sending...'
          : 'Send reset link'}
      </button>

      {sent && (
        <p style={{ marginTop: 15 }}>
          If this email exists, a reset link
          has been sent.(check your email)
        </p>
      )}

    </div>
  )
}