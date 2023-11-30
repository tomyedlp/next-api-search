import React, { useState } from 'react'
import axios from "axios"
import { commentNode } from "@/app/models/Posts"
import CommentContent from '@/app/components/Posts/Comments/CommentContent';
import { usePathname } from 'next/navigation'

function CreateStartComment() {

    const pathname = usePathname()
    const [disabled, setDisabled] = useState<boolean>(false)
    const [comment, setComment] = useState<string>("")
    const [commented, setCommented] = useState<boolean>(false)
    const [resultComment, setResultComment] = useState<commentNode | undefined>(undefined)

    const createComment = async () => {
      setDisabled(true)
      const result = await axios.post('/api/blog/comment', { comment, commentid: undefined, pathname })
      console.log(result.data.data.createComment)
      if(result.status === 200) {
          setCommented(result.data.data.createComment.success)
          setResultComment({ node: result.data.data.createComment.comment })
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
        <CommentContent comment={resultComment} mL={0} setShowReply={null} />
      }
      <div className='flex flex-col'>
          <textarea className='p-2 text-sm h-32 mb-3' onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
          <div className='self-center'>
              <button className='buttonStyle w-[5rem] mr-2' onClick={() => createComment()} disabled={disabled}>Escribir</button>
              <button className='buttonStyle w-[5rem]' onClick={() => setComment("")}>Limpiar</button>
          </div>
      </div>
    </>
  )
}

export default CreateStartComment