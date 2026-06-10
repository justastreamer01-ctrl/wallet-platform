'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ReferralPage() {
  const [wallet, setWallet] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    loadWallet()
  }, [])

  async function loadWallet() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setWallet(data)
    setLoading(false)
  }

  useEffect(() => {
    if (!wallet?.free_access_until) return

    const interval = setInterval(() => {
      const end = new Date(
        wallet.free_access_until
      ).getTime()

      const now = Date.now()

      const diff = end - now

      if (diff <= 0) {
        setTimeRemaining('Expired')
        clearInterval(interval)
        return
      }

      const hours = Math.floor(
        diff / 1000 / 60 / 60
      )

      const minutes = Math.floor(
        (diff / 1000 / 60) % 60
      )

      const seconds = Math.floor(
        (diff / 1000) % 60
      )

      setTimeRemaining(
        `${hours
          .toString()
          .padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [wallet])

  async function useLeaderboardHour() {

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data, error } =
    await supabase.rpc(
      'use_leaderboard_hour',
      {
        p_user_id: user.id,
      }
    )

  if (error) {
    alert(error.message)
    return
  }

  if (!data.success) {
    alert(data.message)
    return
  }

  alert(data.message)

  await loadWallet()
}

  if (loading) {
    return <p>Loading...</p>
  }

  const referralLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}/signup?ref=${wallet.referral_code}`
      : ''

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: 20,
      }}
    >
      <h1>Refer & Earn</h1>

      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 20,
          marginTop: 20,
        }}
      >
        <h2>Referral Statistics</h2>

        <p>
          Successful Referrals:{' '}
          {wallet.referral_count ?? 0}
        </p>

        <p>
          Verified Referrals:{' '}
          {wallet.verified_referral_count ??
            0}
        </p>

        <p>
          Available Leaderboard Hours:{' '}
          {wallet.leaderboard_hours ?? 0}
        </p>

        {wallet.free_access_until &&
          new Date(
            wallet.free_access_until
          ) > new Date() && (
            <div
              style={{
                marginTop: 15,
                padding: 12,
                border: '1px solid #ddd',
                borderRadius: 8,
              }}
            >
              <strong>
                Leaderboard Access Active
              </strong>

              <p>
                Time Remaining:{' '}
                {timeRemaining}
              </p>
            </div>
          )}

        <button
          onClick={useLeaderboardHour}
          style={{
            marginTop: 20,
            width: '100%',
            padding: 12,
          }}
        >
          Use 1 Hour Leaderboard Access
        </button>
      </div>

      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 20,
          marginTop: 20,
        }}
      >
        <h2>Your Referral Link</h2>

        <input
          readOnly
          value={referralLink}
          style={{
            width: '100%',
            padding: 10,
          }}
        />

        <button
          onClick={() => {
            navigator.clipboard.writeText(
              referralLink
            )
            setCopied(true)

            setTimeout(
              () => setCopied(false),
              2000
            )
          }}
          style={{
            marginTop: 10,
            width: '100%',
            padding: 12,
          }}
        >
          {copied
            ? 'Copied!'
            : 'Copy Referral Link'}
        </button>
      </div>
    </div>
  )
}