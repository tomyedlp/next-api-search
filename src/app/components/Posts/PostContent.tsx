import React from 'react'

function PostContent(params: { title: string, content: string }) {

  return (
    <div className='grid grid-cols-3 bg-slate-200 dark:bg-slate-900 rounded-sm p-5'>
        <div>{params.title}</div>
        <div>{params.content}</div>
    </div>
  )
}

export default PostContent