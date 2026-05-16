'use client'

import {
  useEffect,
  useState,
} from 'react'

import Link from 'next/link'

import {
  useParams,
  useRouter,
} from 'next/navigation'

import { supabase } from '../../lib/supabase'

export default function PostPage() {
  const params = useParams()
  const router = useRouter()

  const [post, setPost] = useState<any>(null)

  const [comments, setComments] =
    useState<any[]>([])

  const [comment, setComment] =
    useState('')

  const [loading, setLoading] =
    useState(true)

  const [isAdmin, setIsAdmin] =
    useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    await checkAdmin()
    await loadPost()
    await loadComments()
  }

  const checkAdmin = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (
      session?.user.email ===
      'notsoanonymousuk@gmail.com'
    ) {
      setIsAdmin(true)
    }
  }

  const loadPost = async () => {
    const { data, error } =
      await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    setPost(data)
    setLoading(false)
  }

  const loadComments = async () => {
    const { data, error } =
      await supabase
        .from('comments')
        .select('*')
        .eq('post_id', params.id)
        .order('created_at', {
          ascending: true,
        })

    if (!error) {
      setComments(data || [])
    }
  }

  const submitComment = async () => {
    if (!comment) return

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      alert('Login required')
      return
    }

    const { data: walletData } =
      await supabase
        .from('wallets')
        .select('nickname')
        .eq('user_id', session.user.id)
        .single()

    const { error } = await supabase
      .from('comments')
      .insert({
        post_id: params.id,
        user_id: session.user.id,
        comment,
        nickname:
          walletData?.nickname ||
          session.user.email?.split(
            '@'
          )[0] ||
          'User',
      })

    if (error) {
      alert(error.message)
      return
    }

    setComment('')

    loadComments()
  }

  const deletePost = async () => {
    const confirmed = confirm(
      'Are you sure you want to delete this post?\n\nAll comments under it will also be deleted.'
    )

    if (!confirmed) return

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', params.id)

    if (error) {
      alert(error.message)
      return
    }

    alert('Post deleted')

    router.push('/community')
  }

  if (loading) {
    return (
      <div
        style={{
          padding: 30,
          fontFamily: 'Arial',
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <div
      style={{
        padding: 30,
        maxWidth: 850,
        margin: '0 auto',
        fontFamily: 'Arial',
      }}
    >
      <Link
        href="/community"
        style={{
          textDecoration: 'none',
          color: '#111',
          marginBottom: 20,
          display: 'inline-block',
        }}
      >
        ← Back
      </Link>

      {/* POST */}
      <div
        style={{
          padding: 25,
          border: '1px solid #ddd',
          borderRadius: 16,
          marginBottom: 30,
          background: '#fff',
        }}
      >
        <h1>{post?.title}</h1>

        <p
          style={{
            marginTop: 20,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          {post?.content}
        </p>

        {isAdmin && (
          <button
            onClick={deletePost}
            style={{
              marginTop: 25,
              padding: 12,
              background: 'red',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Delete Post
          </button>
        )}
      </div>

      {/* COMMENT INPUT */}
      <div
        style={{
          marginBottom: 35,
        }}
      >
        <textarea
          placeholder="Write comment..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          rows={4}
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 10,
            border: '1px solid #ddd',
            marginBottom: 12,
          }}
        />

        <button
          onClick={submitComment}
          style={{
            padding: 12,
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Comment
        </button>
      </div>

      {/* COMMENTS */}
      <div>
        <h2>Comments</h2>

        {comments.length === 0 && (
          <div
            style={{
              marginTop: 15,
              color: '#666',
            }}
          >
            No comments yet
          </div>
        )}

        {comments.map((item) => (
          <div
            key={item.id}
            style={{
              padding: 16,
              border: '1px solid #eee',
              borderRadius: 12,
              marginTop: 14,
              background: '#fff',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: 8,
              }}
            >
              {item.nickname}
            </div>

            <div
              style={{
                lineHeight: 1.6,
              }}
            >
              {item.comment}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}