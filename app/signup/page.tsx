'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const signup = async () => {
    if (!agreeToTerms) {
      alert(
        'You must accept the Terms & Conditions and Privacy Policy to continue.'
      )
      return
    }

    if (!email || !password) {
      alert('Email and password are required.')
      return
    }

    setLoading(true)

    try {
      // 1. Create auth user
      const { data, error } =
        await supabase.auth.signUp({
          email,
          password,
        })

      if (error) {
        alert(error.message)
        setLoading(false)
        return
      }

      const userId = data.user?.id

      if (!userId) {
        alert(
          'Signup succeeded but user ID was not returned.'
        )
        setLoading(false)
        return
      }

      // 2. Create wallet for new user
      const { error: walletError } =
        await supabase.from('wallets').insert({
          user_id: userId,
          balance: 0,
          nickname: 'User',
        })

      if (walletError) {
        alert(
          'Account created but wallet setup failed: ' +
            walletError.message
        )
        setLoading(false)
        return
      }

      alert(
        'Account created successfully!'
      )

      router.push('/login')
    } catch (err: any) {
      alert('Unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        padding: 40,
        fontFamily: 'Arial',
      }}
    >
      <h1>Create Account</h1>

      {/* EMAIL */}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          display: 'block',
          marginTop: 10,
          padding: 10,
          width: 280,
        }}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
          display: 'block',
          marginTop: 10,
          padding: 10,
          width: 280,
        }}
      />

      {/* TERMS */}
      <label
        style={{
          display: 'block',
          marginTop: 15,
          fontSize: 14,
          width: 300,
        }}
      >
        <input
          type="checkbox"
          checked={agreeToTerms}
          onChange={(e) =>
            setAgreeToTerms(
              e.target.checked
            )
          }
          style={{ marginRight: 8 }}
        />

        I agree to the Terms & Conditions and Privacy Policy.{' '}

        <span
          onClick={() =>
            router.push('/legal')
          }
          style={{
            color: '#2563eb',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Click here to read them
        </span>
      </label>

      {/* BUTTON */}
      <button
        onClick={signup}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: 10,
          width: 280,
          background: '#111',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading
          ? 'Creating Account...'
          : 'Create Account'}
      </button>
    </div>
  )
}