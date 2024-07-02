import React from 'react'
import { useRouter } from 'next/router'

export default function HomePage() {

  const router = useRouter()

  return (
    <div>
           <h1>Blog post</h1>
           <p>Post id: {router.query.token}</p>
    </div>
  )
}
