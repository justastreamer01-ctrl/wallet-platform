'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alert(error.message)
        setLoading(false)
        return
      }

      if (!data.user) {
        alert('Login failed')
        setLoading(false)
        return
      }

      setLoading(false)

      router.push('/dashboard')
    } catch (err) {
      console.log(err)
      alert('Unexpected login error')
      setLoading(false)
    }
  }

  const signup = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        alert(error.message)
        setLoading(false)
        return
      }

      if (data.user) {
        await supabase.from('wallets').insert({
          user_id: data.user.id,
          balance: 0,
          nickname: email.split('@')[0],
        })
      }

      setLoading(false)

      alert('Account created successfully')
    } catch (err) {
      console.log(err)
      alert('Unexpected signup error')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: 360,
          padding: 20,
          background: '#fff',
          border: '1px solid #d1d5db',
          borderRadius: 15,
          boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Swyft Access</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            marginBottom: 10,
            padding: 10,
            borderRadius: 8,
            border: '1px solid #d1d5db',
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            marginBottom: 10,
            padding: 10,
            borderRadius: 8,
            border: '1px solid #d1d5db',
          }}
        />

        <button
          type="button"
          onClick={login}
          disabled={loading}
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 8,
            border: 'none',
            background: '#4b5563',
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 10,
            cursor: 'pointer',
          }}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <button
          type="button"
          onClick={signup}
          disabled={loading}
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 8,
            border: 'none',
            background: '#111',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  )
}