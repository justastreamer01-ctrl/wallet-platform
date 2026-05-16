'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg,#f5f5f7,#e4e7ec)',
      color: '#111',
      minHeight: '100vh'
    }}>

      {/* Navbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px'
      }}>
        <div style={{ fontWeight: 'bold', letterSpacing: 3 }}>
          Swyft access
        </div>

        <Link href="/login">
          <button style={{
            padding: '10px 22px',
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
            background: '#111',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            Login
          </button>
        </Link>
      </div>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginTop: 100, padding: '0 20px' }}>
        <h1 style={{ fontSize: 60, fontWeight: 900 }}>
          Reinventing Finance<br />With Intelligence
        </h1>

        <p style={{ marginTop: 20, fontSize: 18, color: '#555', maxWidth: 700, margin: '0 auto' }}>
          A modern financial platform built for speed, security, and intelligent decision-making.
        </p>

        <Link href="/login">
          <button style={{
            marginTop: 40,
            padding: '16px 40px',
            borderRadius: 999,
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
            background: '#111',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            Get Started
          </button>
        </Link>
      </div>

      {/* Features */}
      <div style={{
        display: 'flex',
        gap: 30,
        marginTop: 120,
        padding: '0 40px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>

        {[
          ['Advanced Security', 'Advanced fraud detection powered by adaptive intelligence.'],
          ['Smart Wallet', 'Send, receive, and manage money globally in seconds.'],
          ['Rewards', 'Earn monthly rewards and incentives.'],
          ['Virtual Cards', 'Generate cards for online payments (coming soon).']
        ].map((f, i) => (
          <div key={i} style={{
            width: 300,
            padding: 30,
            borderRadius: 20,
            background: '#fff',
            border: '1px solid #e0e0e0'
          }}>
            <h3>{f[0]}</h3>
            <p style={{ color: '#666' }}>{f[1]}</p>
          </div>
        ))}

      </div>

      <div style={{ textAlign: 'center', marginTop: 120, padding: 30, color: '#777' }}>
        © 2026 Swyft access Contact us at: yourveryownhuey@gmail.com
      </div>

    </div>
  )
}