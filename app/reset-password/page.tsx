'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { useEffect } from 'react'

export default function ResetPasswordPage() {
  const router = useRouter()

  useEffect(() => {

  async function checkRecoveryAccess() {

    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) {

      router.replace('/login')

      return
    }

  }

  checkRecoveryAccess()

}, [router])

useEffect(() => {

  const {
    data: listener
  } =
    supabase.auth.onAuthStateChange(
      (event) => {

        if (
          event !==
          'PASSWORD_RECOVERY'
        ) {

          router.replace('/login')
        }
      }
    )

  return () => {
    listener.subscription.unsubscribe()
  }

}, [router])

useEffect(() => {

  const hash =
    window.location.hash

  if (
    !hash.includes(
      'type=recovery'
    )
  ) {

    router.replace('/login')
  }

}, [router])
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