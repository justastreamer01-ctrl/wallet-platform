'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {
  const [password, setPassword] = useState('')

  const updatePassword = async () => {
    if (!password) return

    const { error } =
      await supabase.auth.updateUser({
        password,
      })

    if (error) {
      alert(error.message)
      return
    }

    alert('Password updated successfully')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Reset Password</h1>

      <input
        type="password"
        placeholder="New password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{ padding: 10 }}
      />

      <button
        onClick={updatePassword}
        style={{
          marginTop: 20,
          padding: 10,
        }}
      >
        Update Password
      </button>
    </div>
  )
}