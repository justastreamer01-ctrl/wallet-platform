'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function DashboardPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [wallet, setWallet] = useState<any>(null)
  const [userEmail, setUserEmail] = useState('')
  const [showBalance, setShowBalance] = useState(true)

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // 🔒 block dashboard access
      if (!session) {
        router.replace('/login')
        return
      }

      setUserEmail(session.user.email || '')

      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      if (error || !data) {
        setLoading(false)
        return
      }

      setWallet(data)
      setLoading(false)
    }

    init()
  }, [router])

  const setNickname = async () => {
    if (!wallet) return

    const nickname = prompt('Enter nickname')

    if (!nickname) return

    const { error } = await supabase
      .from('wallets')
      .update({ nickname })
      .eq('id', wallet.id)

    if (error) {
      alert(error.message)
      return
    }

    setWallet({
      ...wallet,
      nickname,
    })

    alert('Nickname updated')
  }

  const uploadKyc = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file || !wallet) return

    const filePath = `${wallet.user_id}/${Date.now()}-${file.name}`

    const { error: uploadError } =
      await supabase.storage
        .from('kyc-docs')
        .upload(filePath, file)

    if (uploadError) {
      alert(uploadError.message)
      return
    }

    const { error } = await supabase
      .from('wallets')
      .update({
        kyc_verified: true,
      })
      .eq('id', wallet.id)

    if (!error) {
      setWallet({
        ...wallet,
        kyc_verified: true,
      })

      alert('KYC uploaded successfully')
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const btnStyle = {
    padding: 14,
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 16,
  }

  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          fontFamily: 'Arial',
        }}
      >
        Loading wallet...
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        color: '#1a1a1a',
        fontFamily:
          'Arial, Helvetica, sans-serif',
      }}
    >
      {/* TOPBAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
          background: '#fff',
          borderBottom: '1px solid #ddd',
        }}
      >
        <div style={{ fontSize: 22 }}>☰</div>

        <div style={{ fontWeight: 'bold' }}>
          Swyft Access Wallet
        </div>
      </div>

      {/* WALLET CARD */}
      <div
        style={{
          margin: 20,
          marginTop: 30,
          padding: 25,
          borderRadius: 24,
          background:
            'linear-gradient(135deg, #111827, #1f2937)',
          color: '#fff',
          boxShadow:
            '0 10px 30px rgba(0,0,0,0.25)',
        }}
      >
        <div
          style={{
            fontSize: 14,
            opacity: 0.8,
          }}
        >
          Available Balance
        </div>

        <div
          style={{
            fontSize: 34,
            fontWeight: 'bold',
            marginTop: 8,
          }}
        >
          {showBalance
            ? `₦${wallet?.balance || 0}`
            : '••••••'}
        </div>

        <button
          onClick={() =>
            setShowBalance(!showBalance)
          }
          style={{
            marginTop: 10,
            padding: 6,
            cursor: 'pointer',
          }}
        >
          Show / Hide
        </button>

        <div style={{ marginTop: 14 }}>
          {userEmail}
        </div>

        <div style={{ marginTop: 6 }}>
          Nickname:{' '}
          {wallet?.nickname || 'None'}
        </div>

        <div style={{ marginTop: 6 }}>
          KYC:{' '}
          {wallet?.kyc_verified
            ? 'Verified'
            : 'Not Verified'}
        </div>
      </div>

      {/* ACTIONS */}
      <div
        style={{
          display: 'grid',
          gap: 12,
          margin: 20,
        }}
      >
        <button
          style={btnStyle}
          onClick={() =>
            alert('Funding coming soon')
          }
        >
          Fund Wallet
        </button>

        <button
          style={btnStyle}
          onClick={() =>
            alert('Transfers coming soon')
          }
        >
          Make Transfer
        </button>

        <button
          style={btnStyle}
          onClick={() =>
            alert('No transactions yet')
          }
        >
          Transaction History
        </button>

        <button
  style={btnStyle}
  onClick={async () => {
    if (!wallet) return

    const nickname = prompt('Enter new nickname')

    if (!nickname) return

    const { data, error } = await supabase
      .from('wallets')
      .update({ nickname })
      .eq('user_id', wallet.user_id)
      .select()
      .single()

    if (error) {
      alert(error.message)
      return
    }

    setWallet(data)

    alert('Nickname updated')
  }}
>
  Set Nickname
</button>


        <label
          style={{
            ...btnStyle,
            display: 'block',
            textAlign: 'center',
          }}
        >
          Upload KYC

          <input
            type="file"
            hidden
            onChange={uploadKyc}
          />
        </label>

        <button
          style={btnStyle}
          onClick={() =>
            alert('Leaderboard coming soon')
          }
        >
          Leaderboard
        </button>

        <button
          style={btnStyle}
          onClick={() =>
            alert(
              'yourveryownhuey@gmail.com'
            )
          }
        >
          Contact Support
        </button>

        <button
          style={{
            ...btnStyle,
            background: '#111',
            color: '#fff',
          }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}