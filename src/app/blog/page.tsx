"use client"
import React, { useState, useEffect } from 'react'
import axios from "axios"
import PostContent from "@/app/components/Posts/PostContent"

interface PostNode {
    title: string
    excerpt: string
    date?: Date
    slug?: string
}
interface Post {
    node: PostNode
}


function Blog() {

    const [posts, setPosts] = useState<Array<Post>>([]);

    useEffect(() => {
        const getPosts = async () => {
            const result = await axios.post('/api/blog')
            setPosts(result.data);
        };
        getPosts()
    }, []);


    const loopingPosts = () => {
        if(posts.length !== 0) {
            return posts.map((post, id) => (
               <PostContent key={id} title={post.node.title} content={post.node.excerpt} />
            ))
        } else {
            return <div className='mx-auto bg-slate-200 dark:bg-slate-900 rounded-sm p-5'>No hay posts. </div>
        }
    }

  return (
    <div className='container mx-auto'>
        {loopingPosts()}
    </div>
  )
}

export default Blog