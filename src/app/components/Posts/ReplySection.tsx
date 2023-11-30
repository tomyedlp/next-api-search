"use client"
import React, { useState } from 'react'
import axios from "axios"
import CommentContent from '@/app/components/Posts/Comments/CommentContent';
import { commentNode } from "@/app/models/Posts"
import { usePathname } from 'next/navigation'

function ReplySection(params: { showReply: boolean, setShowReply: Function, mL: number, commentid: number }) {

    const pathname = usePathname()
    const [disabled, setDisabled] = useState<boolean>(false)
    const [comment, setComment] = useState<string>("")
    const [commented, setCommented] = useState<boolean>(false)
    const [resultComment, setResultComment] = useState<commentNode | undefined>(undefined)

    const createComment = async () => {
        setDisabled(true)
        const result = await axios.post('/api/blog/comment', { comment, commentid: params.commentid, pathname })
        console.log(result.data.data.createComment)
        if(result.status === 200 && result.data.data.createComment !== null) {
            setCommented(result.data.data.createComment.success)
            setResultComment({ node: result.data.data.createComment.comment })
            params.setShowReply(false)
        } else {
            //something fail
            //send a fail message
        }
        setTimeout(function(){
            setDisabled(false)
        }, 5000);
    }

  return (
    <>
    {commented && resultComment !== undefined &&
        <CommentContent comment={resultComment} mL={params.mL+25} setShowReply={null} />
    }
    {params.showReply && 
        <div className='flex py-2' style={{ marginLeft: params.mL+"px" }}>
            <textarea placeholder='Responder...' className='mr-3 w-72 h-16 p-1 text-xs' value={comment} onChange={(e) => {setComment(e.target.value)}}></textarea>
            <button className='buttonStyle' onClick={(e) => createComment()} disabled={disabled}>Responder</button>
        </div>
    }
    </>
  )
}

export default ReplySection