import React, { useState } from 'react'
import axios from "axios"
import CommentContent from '@/app/components/Posts/Comments/CommentContent';

function ReplySection(params: { showReply: boolean, mL: number, commentid: number }) {

    const [comment, setComment] = useState<string>("")
    const [commented, setCommented] = useState<boolean>(false)

    const createComment = async () => {
        const result = await axios.post('/api/blog/comment', { comment, commentid: params.commentid })
        console.log(result)
        if(result.status === 200) {
            //something here
            // emulates comment - commentid
            setCommented(result.data.success)
        } else {
            //something fail
            //send a fail message
        }
    }

  return (
    <>
    {params.showReply && 
        <div className='flex py-2' style={{ marginLeft: params.mL+"px" }}>
            <textarea placeholder='Responder...' className='mr-3 w-72 h-16 p-1 text-xs' value={comment} onChange={(e) => {setComment(e.target.value)}}></textarea>
            <button className='buttonStyle' onClick={(e) => createComment()}>Responder</button>
        </div>
    }
    {commented &&
        <CommentContent comment={comment} mL={params.mL} />
    }
    </>
  )
}

export default ReplySection