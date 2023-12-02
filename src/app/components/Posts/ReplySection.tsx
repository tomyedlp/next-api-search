"use client"
import React, { useState } from 'react'
import axios from "axios"
import parse from "html-react-parser"
import CommentContent from '@/app/components/Posts/Comments/CommentContent';
import { commentNode } from "@/app/models/Posts"
import { animateErrorComponent } from "@/app/utils/animations"
import { usePathname } from 'next/navigation'
import LoadingPage from '@/app/components/Loading';

function ReplySection(params: { showReply: boolean, setShowReply: Function, mL: number, commentid: number }) {

    const pathname = usePathname()
    const [disabled, setDisabled] = useState<boolean>(false)
    const [comment, setComment] = useState<string>("")
    const [commented, setCommented] = useState<boolean>(false)
    const [resultComment, setResultComment] = useState<commentNode | undefined>(undefined)
    const [errorMsg, setErrorMsg] = useState<string>("")

    const createComment = async () => {
        setDisabled(true)
        if(comment.trim() !== "") {
            const result = await axios.post('/api/blog/comment', { comment, commentid: params.commentid, pathname })
            console.log(result.data.data)
            if(result.status === 200 && result.data.data.createComment !== null) {
                setCommented(result.data.data.createComment.success)
                setResultComment({ node: result.data.data.createComment.comment })
                params.setShowReply(false)
                setErrorMsg("")
            } else {
                setCommented(false)
                setErrorMsg(result.data.errors[0].message)
            }
        } else {
            setCommented(false)
            setErrorMsg("Comentario vacío")
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
    <div className='bg-red-300 text-red-600 my-2' style={animateErrorComponent(commented, errorMsg, params.mL)}>
        {parse(errorMsg)}
    </div>
    }
    {params.showReply &&
        <div className='flex py-2 relative' style={{ marginLeft: params.mL+"px" }}>
            <textarea placeholder='Responder...' className='mr-3 w-72 h-16 p-1 text-xs' disabled={disabled} value={comment} onChange={(e) => {setComment(e.target.value)}}>
            </textarea>
            <button className='buttonStyle' onClick={(e) => createComment()} disabled={disabled}>{disabled ? "Cargando..." : "Responder"}</button>
        </div>
    }
    </>
  )
}

export default ReplySection