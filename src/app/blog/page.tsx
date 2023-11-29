"use client"
import React, { useState, useEffect } from 'react'
import axios from "axios"
import PostContent from "@/app/components/Posts/PostContent"
import { Post } from "@/app/models/Posts"
import LoadingPage from '../components/Loading'

function Blog() {

    const [posts, setPosts] = useState<Array<Post>>([]);
    const [status, setStatus] = useState<number | undefined>(undefined);

    useEffect(() => {
        const getPosts = async () => {
            const result = await axios.post('/api/blog')
            setStatus(result.status)
            setPosts(result.data);
        };
        getPosts()
    }, []);


    const loopingPosts = () => {
        return posts.map((post, id) => (
            <PostContent key={id} post={post} />
        ))
    }

    if(status === undefined) {
        return <LoadingPage />
    } else {
        if(posts.length !== 0) {
            return (
                <div className='container mx-auto grid grid-cols-3'>
                    {loopingPosts()}
                </div>
              )
        } else {
            return (<div className='container mx-auto bg-slate-200 dark:bg-slate-900 rounded-sm p-5'>No hay posts. </div>)
        }
    }
    
  
}

export default Blog