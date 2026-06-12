'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LeaderboardPage() {

  const [leaderboard, setLeaderboard] =
    useState<any[]>([])

  const [userId, setUserId] =
    useState<string | null>(null)

  const rowRefs =
    useRef<
    Record<string, HTMLDivElement | 
    null>
    >({})

  // ---------------------------
  // Get current user + leaderboard
  // ---------------------------
  useEffect(() => {

    async function init() {

      const { data: userData } =
        await supabase.auth.getUser()

      const user =
        userData?.user

      if (user) {
        setUserId(user.id)
      }

      const { data } = await supabase
        .from('leaderboard')
        .select('*')
        .order('transaction_count', {
          ascending: false
        })

      setLeaderboard(data || [])
    }

    init()

  }, [])

  // ---------------------------
  // Auto scroll to current user
  // ---------------------------
  useEffect(() => {

    if (!userId) return

    const myRow =
      rowRefs.current[userId]

    if (myRow) {
      myRow.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }

  }, [leaderboard, userId])

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 20
      }}
    >

      <h1>🏆 Leaderboard</h1>

      {/* YOUR RANK HEADER */}
      {userId && (
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: '#fff',
            padding: 10,
            borderBottom: '1px solid #ddd',
            marginBottom: 15,
            zIndex: 10
          }}
        >
          Your Rank: #
          {leaderboard.findIndex(
            u => u.user_id === userId
          ) + 1}
        </div>
      )}

      {/* LEADERBOARD LIST */}
      <div
        style={{
          maxHeight: '75vh',
          overflowY: 'auto'
        }}
      >
        {leaderboard.map((user, index) => {

          const isMe =
            user.user_id === userId

          return (
            <div
              key={user.user_id}

              ref={(el) => {
                if (el) {
                rowRefs.current[
                  user.user_id
                ] = el
              }
            }}

              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                padding: 12,
                marginBottom: 8,
                borderRadius: 10,

                border: isMe
                  ? '2px solid gold'
                  : '1px solid #ddd',

                background: isMe
                  ? '#fff8dc'
                  : '#fff',

                animation: isMe
                  ? 'pulse 1s infinite'
                  : 'none'
              }}
            >
              <span>
                #{index + 1}{' '}
                {user.nickname}
              </span>

              <div
  style={{
    textAlign: 'right'
  }}
>
  <div>
    {user.transaction_count}
  </div>

  <div
    style={{
      fontSize: 12,
      opacity: 0.7
    }}
  >
    {user.transaction_count > 0
      ? new Date(
          user.leaderboard_updated_at
        ).toLocaleString()
      : 'No transactions yet'}
  </div>
</div>
            </div>
          )
        })}
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>

    </div>
  )
}