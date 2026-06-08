'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')
  const [loading, setLoading] = useState(false)

  const resetPassword = async () => {
    if (!password) {
      alert('Please enter a new password.')
      return
    }

    if (password.length < 8) {
      alert(
        'Password must be at least 8 characters.'
      )
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    setLoading(true)

    const { error } =
      await supabase.auth.updateUser({
        password,
      })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert(
      'Password updated successfully. Please log in with your new password.'
    )

    router.push('/login')
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '50px auto',
        padding: 20,
        border: '1px solid #ddd',
        borderRadius: 10,
      }}
    >
      <h1>Reset Password</h1>

      <p>
        Enter your new password below.
      </p>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 10,
        }}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 15,
        }}
      />

      <button
        onClick={resetPassword}
        disabled={loading}
        style={{
          width: '100%',
          padding: 12,
          cursor: 'pointer',
        }}
      >
        {loading
          ? 'Updating Password...'
          : 'Update Password'}
      </button>
    </div>
  )
}