'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const sendReset = async () => {
    if (!email) return

    const { error } =
      await supabase.auth.resetPasswordForEmail(email, {
  redirectTo:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/reset-password'
      : 'https://swyftaccessng.netlify.app/reset-password',
})

    if (error) {
      alert(error.message)
      return
    }

    alert('Password reset email sent')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Forgot Password</h1>

      <input
        placeholder="Enter email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{ padding: 10, marginTop: 10 }}
      />

      <button
        onClick={sendReset}
        style={{
          marginTop: 20,
          padding: 10,
        }}
      >
        Send Reset Link
      </button>
    </div>
  )
}