'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
const heroImage =
  "https://i.imgur.com/Bp7vLtn.png/image.png"
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  // 🔐 LOGIN
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

  // 🆕 SIGN UP (RESTORED)
  const signUp = async () => {
    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      })

    if (error) {
      alert(error.message)
      return
    }

    alert('Account created! Check your email if confirmation is enabled.')
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
      <div
  style={{
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
    marginBottom: 30,
    position: "relative",
  }}
>
<div
  style={{
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  }}
>

  {/* DARK MODE BUTTON GOES HERE */}
  {/* 🌙 DARK MODE TOGGLE */}
      <button
        style={styles.toggle}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
      </div>

  <img
    src={heroImage}
    alt="Wallet Dashboard"
    draggable={false}
    style={{
      width: "100%",
      height: "auto",
      display: "block",
      objectFit: "contain",
      userSelect: "none",
      pointerEvents: "none",
    }}
  />
</div>
      

      <h1>Login to Swyft access</h1>

      {/* EMAIL */}
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      {/* LOGIN */}
      <button onClick={login} style={styles.button}>
        Login
      </button>

      {/* SIGN UP (NEW BACK) */}
      {/* TERMS CHECKBOX */}
<label
  style={{
    display: 'block',
    marginTop: 15,
    fontSize: 14,
    maxWidth: 260,
  }}
>
  <input
    type="checkbox"
    checked={agreeToTerms}
    onChange={(e) =>
      setAgreeToTerms(e.target.checked)
    }
    style={{ marginRight: 8 }}
  />

  I agree to the Terms & Conditions and
  Privacy Policy.{' '}
  <span
    onClick={() => router.push('/legal')}
    style={{
      color: '#2563eb',
      cursor: 'pointer',
      textDecoration: 'underline',
    }}
  >
    Click here to read them.
  </span>
</label>

<button
  onClick={signUp}
  disabled={!agreeToTerms}
  style={{
    marginTop: 20,
    padding: 10,
    width: 280,
    background: agreeToTerms ? '#111' : '#888',
    color: '#fff',
    border: 'none',
    cursor: agreeToTerms ? 'pointer' : 'not-allowed',
  }}
>
  Create Account
</button>
      {/* OTP */}
      <button onClick={loginWithOtp} style={styles.button}>
        Login with Email OTP
      </button>

      {/* FORGOT PASSWORD */}
      <button
        onClick={() => router.push('/forgot-password')}
        style={styles.button}
      >
        Forgot Password
      </button>
      <p><a href="/legal">Click here to Read privacy policy & terms</a></p>
    </div>
    
  )
}