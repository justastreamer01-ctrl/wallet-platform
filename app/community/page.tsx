'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', {
        ascending: false,
      })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    setPosts(data || [])
    setLoading(false)
  }

  if (loading) {
    return (
      <div
        style={{
          padding: 30,
          fontFamily: 'Arial',
        }}
      >
        Loading posts...
      </div>
    )
  }

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 900,
        margin: '0 auto',
        fontFamily: 'Arial',
      }}
    >
      <h1
        style={{
          marginBottom: 25,
        }}
      >
        Community
      </h1>

      {posts.length === 0 && (
        <div>No posts yet</div>
      )}

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
            background: '#fff',
          }}
        >
          <h2
            style={{
              marginBottom: 10,
            }}
          >
            {post.title}
          </h2>

          <p
            style={{
              color: '#444',
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            {post.content.length > 180
              ? post.content.slice(0, 180) +
                '...'
              : post.content}
          </p>

          <Link
            href={`/community/${post.id}`}
            style={{
              textDecoration: 'none',
              color: '#111',
              fontWeight: 'bold',
            }}
          >
            Open Post →
          </Link>
        </div>
      ))}
    </div>
  )
}