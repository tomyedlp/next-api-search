import { Post } from '@/app/models/Posts';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import LoadingPage from '@/app/components/Loading';

function PostBlog({ params }: { params: { id: string }}) {

    const [post, setPost] = useState<Post | null>(null)
    const [status, setStatus] = useState<number | undefined>(undefined)

    useEffect(() => {
        const getPostWhileLoading = async () => {
            if(status === undefined) {
                const result = await axios.get('/api/blog/'+params.id)
                console.log(result.data)
                setPost(result.data)
                setStatus(result.status)
            }
            return post
        };
        getPostWhileLoading();
    }, [status]);


    return (
        <div className='container mx-auto bg-slate-200 dark:bg-slate-900 rounded-sm p-5'>
            {status === 200 && post === null &&
                <div>No existe ningún post con ese ID. </div>
            }
            {status === undefined &&
                <LoadingPage />
            }
            {status === 200 && post !== null &&
                <div className="font-bold">
                    Hay post.. aca ponemos content, title.., etc
                </div>
            }
        </div>
    )
}

export default PostBlog