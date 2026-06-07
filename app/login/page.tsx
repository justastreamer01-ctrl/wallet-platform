'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  // 🔐 PASSWORD LOGIN
  const login = async () => {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  // 📧 OTP LOGIN
  const loginWithOtp = async () => {
    if (!email) return

    const { error } =
      await supabase.auth.signInWithOtp({
        email,
      })

    if (error) {
      alert(error.message)
      return
    }

    alert('Check your email for login link')
  }

  const styles = {
    page: {
      minHeight: '100vh',
      padding: 40,
      background: darkMode ? '#0f172a' : '#f3f4f6',
      color: darkMode ? '#fff' : '#111',
      transition: '0.3s ease',
    },
    input: {
      padding: 10,
      marginTop: 10,
      width: 260,
      display: 'block',
      borderRadius: 6,
      border: '1px solid #ccc',
    },
    button: {
      marginTop: 10,
      padding: 10,
      width: 260,
      cursor: 'pointer',
      borderRadius: 6,
      border: 'none',
      background: darkMode ? '#1e293b' : '#111',
      color: '#fff',
    },
    toggle: {
      marginBottom: 20,
      padding: 8,
      cursor: 'pointer',
      borderRadius: 6,
      border: '1px solid #999',
      background: darkMode ? '#1e293b' : '#fff',
      color: darkMode ? '#fff' : '#111',
    },
  }

  return (
    <div style={styles.page}>
      {/* 🌙 DARK MODE TOGGLE */}
      <button
        style={styles.toggle}
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode
          ? '🌞 Light Mode'
          : '🌙 Dark Mode'}
      </button>

      <h1>Login</h1>

      {/* EMAIL */}
      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={styles.input}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={styles.input}
      />

      {/* LOGIN BUTTON */}
      <button
        onClick={login}
        style={styles.button}
      >
        Login
      </button>

      {/* OTP LOGIN */}
      <button
        onClick={loginWithOtp}
        style={styles.button}
      >
        Login with Email OTP
      </button>

      {/* FORGOT PASSWORD */}
      <button
        onClick={() =>
          router.push('/forgot-password')
        }
        style={styles.button}
      >
        Forgot Password
      </button>
    </div>
  )
}