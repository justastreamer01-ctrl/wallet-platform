'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function PinPage() {
  const router = useRouter()

  const [currentPin, setCurrentPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSetPin = async () => {
    if (!newPin || newPin.length < 4 || newPin.length > 6) {
      setMessage('PIN must be 4–6 digits')
      return
    }

    if (newPin !== confirmPin) {
      setMessage('PINs do not match')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/login')
        return
      }

      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('id, transfer_pin_hash')
        .eq('user_id', session.user.id)
        .single()

      if (walletError || !walletData) {
        setMessage('Could not load wallet')
        return
      }

      const bcrypt = await import('bcryptjs')

      if (walletData.transfer_pin_hash && currentPin) {
        const valid = await bcrypt.compare(currentPin, walletData.transfer_pin_hash)
        if (!valid) {
          setMessage('Current PIN is incorrect')
          return
        }
      } else if (walletData.transfer_pin_hash && !currentPin) {
        setMessage('Enter your current PIN to change it')
        return
      }

      const hash = await bcrypt.hash(newPin, 10)

      const { error } = await supabase
        .from('wallets')
        .update({ transfer_pin_hash: hash })
        .eq('id', walletData.id)

      if (error) {
        setMessage(error.message)
        return
      }

      setMessage('Transfer PIN set successfully')
      setCurrentPin('')
      setNewPin('')
      setConfirmPin('')
    } catch (err: any) {
      setMessage('Unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    padding: 10,
    marginTop: 10,
    width: 260,
    display: 'block' as const,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
  }

  const buttonStyle = {
    marginTop: 14,
    padding: 12,
    width: 282,
    cursor: 'pointer',
    borderRadius: 6,
    border: 'none',
    background: '#111',
    color: '#fff',
    fontSize: 16,
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 40,
        background: '#f3f4f6',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#111',
      }}
    >
      <button
        onClick={() => router.push('/dashboard')}
        style={{
          marginBottom: 20,
          padding: '8px 14px',
          cursor: 'pointer',
          borderRadius: 6,
          border: '1px solid #ccc',
          background: '#fff',
        }}
      >
        ← Back
      </button>

      <h1 style={{ marginBottom: 6 }}>Set Transfer PIN</h1>
      <p style={{ color: '#555', marginBottom: 24 }}>
        Your PIN is required to authorise wallet transfers.
      </p>

      <label style={{ display: 'block', marginTop: 16, fontWeight: 'bold' }}>
        Current PIN (leave blank if setting for the first time)
      </label>
      <input
        type="password"
        inputMode="numeric"
        maxLength={6}
        placeholder="Current PIN"
        value={currentPin}
        onChange={(e) => setCurrentPin(e.target.value)}
        style={inputStyle}
      />

      <label style={{ display: 'block', marginTop: 16, fontWeight: 'bold' }}>
        New PIN (4–6 digits)
      </label>
      <input
        type="password"
        inputMode="numeric"
        maxLength={6}
        placeholder="New PIN"
        value={newPin}
        onChange={(e) => setNewPin(e.target.value)}
        style={inputStyle}
      />

      <label style={{ display: 'block', marginTop: 16, fontWeight: 'bold' }}>
        Confirm New PIN
      </label>
      <input
        type="password"
        inputMode="numeric"
        maxLength={6}
        placeholder="Confirm PIN"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
        style={inputStyle}
      />

      {message && (
        <p
          style={{
            marginTop: 14,
            color: message.includes('successfully') ? '#16a34a' : '#dc2626',
          }}
        >
          {message}
        </p>
      )}

      <button
        onClick={handleSetPin}
        disabled={loading}
        style={{
          ...buttonStyle,
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Saving...' : 'Save PIN'}
      </button>
    </div>
  )
}
