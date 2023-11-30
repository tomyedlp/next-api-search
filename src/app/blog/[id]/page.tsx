"use client"
import { PostNode, commentNode } from '@/app/models/Posts';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import parse from 'html-react-parser'
import LoadingPage from '@/app/components/Loading';
import CommentSection from '@/app/components/Posts/Comments/CommentSection';
import CreateStartComment from '@/app/components/Posts/Comments/CreateStartComment';

function PostBlog({ params }: { params: { id: string }}) {

    const [post, setPost] = useState<PostNode | null>(null)
    const [status, setStatus] = useState<number | undefined>(undefined)
    const [comments, setComments] = useState<Array<commentNode>>([])

    const StringToDate = (date: string) => {
        let toDate: Date = new Date(date || "")
        return toDate.getDate()+"/"+(toDate.getMonth()+1)+"/"+toDate.getFullYear()
    }

    useEffect(() => {
        const getPostWhileLoading = async () => {
            if(status === undefined) {
                const result = await axios.get('/api/blog/'+params.id)
                //console.log(result.data)
                setPost(result.data)
                setComments(result.data.comments.edges)
                setStatus(result.status)
            }
            return post
        };
        getPostWhileLoading();
    }, [status]);


    const loopingComments = () => {
        console.log(comments)
        if(comments.length === 0) {
            return <div className='flex justify-center my-10 italic'>No hay commentarios. Soyez Le Premier!</div>
        } else {
            return comments.map((comment, id) => (
                <CommentSection key={id} comments={comments} comment={comment} commentId={comment.node.commentId} />
            ))
        }
        
    }


    return (
        <div className='container mx-auto bg-slate-200 dark:bg-slate-900 rounded-sm p-5'>
            {status === 200 && post === null &&
                <div>No existe ningún post con ese ID. </div>
            }
            {status === undefined &&
                <LoadingPage />
            }
            {status === 200 && post !== null &&
                <>
                    <div>
                        <div className='flex justify-between'>
                            <div className="font-bold text-xl">{post.title}</div>
                            <div>{StringToDate(post.date)}</div>
                        </div>
                        <div>
                            {parse(post.content || "")}
                        </div>
                    </div>
                    <hr className='my-5' />
                    <div>
                        <div className="font-bold text-xl">Comentarios: </div>
                        <div>
                            {loopingComments()}
                            <hr className='my-10' />
                            <CreateStartComment />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default PostBlog