'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PinPage() {
  const router = useRouter()

  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')

  const savePin = async () => {
    if (pin.length !== 4) {
      alert('PIN must be 4 digits')
      return
    }

    if (pin !== confirmPin) {
      alert('PINs do not match')
      return
    }

    const res = await fetch('/api/security/set-pin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pin }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert('PIN saved successfully')
    router.push('/dashboard')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Set Transfer PIN</h1>

      <input
        type="password"
        maxLength={4}
        placeholder="Enter 4-digit PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        maxLength={4}
        placeholder="Confirm PIN"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
      />

      <br /><br />

      <button onClick={savePin}>
        Save PIN
      </button>
    </div>
  )
}