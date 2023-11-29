import React from 'react'

function PostBlog({ params }: { params: { id: string }}) {

    console.log(params.id);

  return (
    <div>{params.id}</div>
  )
}

export default PostBlog