'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function DashboardPage() {
  const router = useRouter()

  const [showLeaderboardPopup, setShowLeaderboardPopup] =
  useState(true)
  const [loading, setLoading] = useState(true)
  const [wallet, setWallet] = useState<any>(null)
  const [userEmail, setUserEmail] = useState('')
  const [showBalance, setShowBalance] = useState(false)
  const [showLeaderboardModal,
  setShowLeaderboardModal] =
  useState(false)
  const [leaderboardPosition,
  setLeaderboardPosition] =
  useState({
    x: 20,
    y: 20,
  })

const [dragging,
  setDragging] =
  useState(false)

const handleMouseDown = () => {
  setDragging(true)
}

const handleMouseUp = () => {
  setDragging(false)
}

const handleMouseMove = (
  e: MouseEvent
) => {
  if (!dragging) return

  setLeaderboardPosition({
    x: e.clientX - 90,
    y: e.clientY - 25,
  })
}

  const [leaderboardTimeRemaining,
  setLeaderboardTimeRemaining] =
  useState('')
  const hasLeaderboardAccess =
  wallet?.subscription_active ||
  (
    wallet?.free_access_until &&
    new Date(wallet.free_access_until) >
      new Date()
  )

  useEffect(() => {
  if (!wallet?.free_access_until)
    return

  const interval =
    setInterval(() => {

      const end =
        new Date(
          wallet.free_access_until
        ).getTime()

      const now = Date.now()

      const diff = end - now

      if (diff <= 0) {
        setLeaderboardTimeRemaining(
          ''
        )
        clearInterval(interval)
        return
      }

      const hours =
        Math.floor(
          diff / 1000 / 60 / 60
        )

      const minutes =
        Math.floor(
          (diff / 1000 / 60) % 60
        )

      const seconds =
        Math.floor(
          (diff / 1000) % 60
        )

      setLeaderboardTimeRemaining(
        `${hours
          .toString()
          .padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      )

    }, 1000)

  return () =>
    clearInterval(interval)

}, [wallet?.free_access_until])

useEffect(() => {

  window.addEventListener(
    'mousemove',
    handleMouseMove
  )

  window.addEventListener(
    'mouseup',
    handleMouseUp
  )

  return () => {

    window.removeEventListener(
      'mousemove',
      handleMouseMove
    )

    window.removeEventListener(
      'mouseup',
      handleMouseUp
    )

  }

}, [dragging])
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

  const handleLeaderboardClick = () => {
  if (hasLeaderboardAccess) {
    alert('Leaderboard Coming Soon')
    return
  }

  setShowLeaderboardModal(true)
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
          onClick={async () => {
  const email = prompt('Receiver email')
  const amount = prompt('Amount')

  if (!email || !amount) return

  // 🔐 STEP 1: PIN CHECK
  const pin = prompt('Enter your Transfer PIN')

  if (!pin) {
    alert('PIN required')
    return
  }

  const bcrypt = await import('bcryptjs')

  const { data, error } = await supabase
    .from('wallets')
    .select('transfer_pin_hash')
    .eq('id', wallet.id)
    .single()

  if (error || !data?.transfer_pin_hash) {
    alert('PIN not set')
    return
  }

  const valid = await bcrypt.compare(
    pin,
    data.transfer_pin_hash
  )

  if (!valid) {
    alert('Invalid PIN')
    return
  }

  // 💸 STEP 2: CALL TRANSFER API
  const res = await fetch('/api/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      receiverEmail: email,
      amount: Number(amount),
    }),
  })

  const result = await res.json()

  if (!res.ok) {
    alert(result.error)
    return
  }

  alert('Transfer successful')
}}
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

        <button style={btnStyle} onClick={handleLeaderboardClick}>
  Leaderboard
</button>

<button style={btnStyle}
  onClick={() => router.push('/referral')}>Referrals and referral rewards access</button>

        <button
          style={btnStyle}
          onClick={() =>
            alert(
              'Email for Support if any issues at: yourveryownhuey@gmail.com'
            )
          }
        >
          Contact Support
        </button>

<button
  style={btnStyle}
  onClick={() => router.push('/community')}
>
  Community (Find posts about rewards and other updates from our team and ask questions or give feedback)
</button>
<button
  style={btnStyle}
  onClick={async () => {
    const pin = prompt('Set a 4–6 digit transfer PIN')

    if (!pin) return

    const bcrypt = await import('bcryptjs')

    const hash = await bcrypt.hash(pin, 10)

    const { error } = await supabase
      .from('wallets')
      .update({
        transfer_pin_hash: hash,
      })
      .eq('id', wallet.id)

    if (error) {
      alert(error.message)
      return
    }

    alert('Transfer PIN set successfully')
  }}
>
  Set Transfer PIN
</button>
<button
  style={btnStyle}
  
  onClick={async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      alert('Not logged in')
      return
    }

    const res = await fetch(
      '/api/recovery/generate',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    )

    const text = await res.text()

    let data
    try {
      data = JSON.parse(text)
    } catch (err) {
      console.error('Invalid response:', text)
      alert('Server error. Check console.')
      return
    }

    if (!res.ok) {
      alert(data?.error || 'Request failed')
      return
    }

    const confirm = prompt(
      `⚠ SAVE THIS 12-WORD PHRASE (shown once):\n\n${data.phrase}\n\nType "I saved it" to confirm`
    )

    if (confirm !== 'I saved it') {
      alert('Recovery not confirmed')
      return
    }

    alert('Recovery phrase secured successfully')
  } catch (err: any) {
    console.error(err)
    alert('Unexpected error occurred')
  }
}}
>
  View 12-word Security Phrase
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
        {showLeaderboardModal && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: '#fff',
        padding: 24,
        borderRadius: 12,
        width: '90%',
        maxWidth: 450,
        position: 'relative',
      }}
    >
      <button
        onClick={() =>
          setShowLeaderboardModal(false)
        }
        
      >
        ×
      </button>

      <h2>Leaderboard Access Required</h2>

      <p>
        Purchase a subscription or use
        a valid access code to unlock
        leaderboard participation.
      </p>

      <button
        onClick={() =>
          router.push(
            '/subscriptions/leaderboard'
          )
        }
        style={{
          width: '100%',
          marginTop: 15,
          padding: 12,
        }}
      >
        Purchase Leaderboard Subscription
      </button>

      <button
        onClick={() =>
          router.push(
            '/referral'
          )
        }
        style={{
          width: '100%',
          marginTop: 10,
          padding: 12,
        }}
      >
        Use referral count to Unlock Leaderboard access
      </button>
    </div>
  </div>
)}
      </div>
      {showLeaderboardPopup && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.65)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: '#fff',
        width: '90%',
        maxWidth: 500,
        borderRadius: 12,
        padding: 24,
        position: 'relative',
        boxShadow:
          '0 10px 30px rgba(0,0,0,0.2)',
      }}
    >
      {/* X Button */}
      <button
        onClick={() =>
          setShowLeaderboardPopup(false)
        }
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          fontSize: 22,
          fontWeight: 'bold',
        }}
      >
        ×
      </button>

      <h2
        style={{
          marginBottom: 15,
        }}
      >
        What is the Leaderboard?
      </h2>

      <p
        style={{
          lineHeight: 1.6,
          marginBottom: 20,
        }}
      >
        🏆 **Monthly Leaderboard Challenge** 🏆 </p>

<p>Every transaction counts.</p>
<p></p>
The Leaderboard ranks users based on the number of successful transactions completed during the current month. The higher your transaction count, the higher you climb.
<p></p>
Finish the month in the <b>Top 1,000</b> and you'll earn a reward equivalent to <b> ₦ 77,000.00</b> Better yet, the leaderboard resets every month, giving everyone a fresh chance to compete from zero and claim a winning spot.
<p></p>
Think you have what it takes to make the Top 1,000? Track your rank, monitor your progress, and see how close you are to the next position by clicking **Leaderboard** on the Dashboard page.
<p></p>
The race starts fresh every month. Stay active, climb the rankings, and secure your place among the winners.
<p></p>
For more updates about the leaderboard and other rewards, check the Community for more info.
<p></p>

      <button
        onClick={() =>
          setShowLeaderboardPopup(false)
        }
        style={{
          width: '100%',
          padding: 12,
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          background: '#111',
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        Continue
      </button>
    </div>
  </div>
)}
    {leaderboardTimeRemaining && (
  <div
    onMouseDown={
      handleMouseDown
    }
    style={{
      position: 'fixed',

      left:
        leaderboardPosition.x,

      top:
        leaderboardPosition.y,

      zIndex: 1000,

      padding: '10px 14px',

      borderRadius: 12,

      background: '#111',

      color: '#fff',

      cursor: 'move',

      userSelect: 'none',

      boxShadow:
        '0 4px 12px rgba(0,0,0,0.25)',

      minWidth: 180,

      textAlign: 'center',
    }}
  >
    <div
      style={{
        fontSize: 12,
        opacity: 0.8,
      }}
      onClick={() =>
  router.push('/referral')
}
    >
      🏆 Leaderboard Active
    </div>

    <div
      style={{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
      }}
      onClick={() =>
  router.push('/referral')
}
    >
      {leaderboardTimeRemaining}
    </div>
  </div>
)}
    </div>
  )
}