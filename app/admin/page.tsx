'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const createPost = async () => {
    if (!title || !content) {
      alert('Fill all fields')
      return
    }

    setLoading(true)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      alert('Not logged in')
      setLoading(false)
      return
    }

    // 🔒 only your email can post
    if (
      session.user.email !==
      'notsoanonymousuk@gmail.com'
    ) {
      alert('Unauthorized')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('posts')
      .insert({
        title,
        content,
      })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    setTitle('')
    setContent('')

    alert('Post created')
  }

  return (
    <div
      style={{
        padding: 30,
        maxWidth: 700,
        margin: '0 auto',
        fontFamily: 'Arial',
      }}
    >
      <h1
        style={{
          marginBottom: 20,
        }}
      >
        Admin Post Creator
      </h1>

      <input
        placeholder="Post title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        style={{
          width: '100%',
          padding: 14,
          marginBottom: 15,
          border: '1px solid #ddd',
          borderRadius: 8,
        }}
      />

      <textarea
        placeholder="Write post..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        rows={10}
        style={{
          width: '100%',
          padding: 14,
          marginBottom: 15,
          border: '1px solid #ddd',
          borderRadius: 8,
        }}
      />

      <button
        onClick={createPost}
        disabled={loading}
        style={{
          padding: 14,
          background: '#111',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        {loading
          ? 'Posting...'
          : 'Create Post'}
      </button>
    </div>
  )
}