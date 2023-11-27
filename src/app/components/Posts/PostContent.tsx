import React from 'react'

function PostContent(params: { title: string, content: string }) {
    
  return (
    <>
        <div>{params.title}</div>
        <div>{params.content}</div>
    </>
  )
}

export default PostContent