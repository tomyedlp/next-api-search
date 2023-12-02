import React, { useState } from 'react'
import axios from "axios"
import parse from "html-react-parser"
import { commentNode } from "@/app/models/Posts"
import { animateErrorComponent } from "@/app/utils/animations"
import CommentContent from '@/app/components/Posts/Comments/CommentContent';
import { usePathname } from 'next/navigation'
import LoadingPage from '@/app/components/Loading';

function CreateStartComment() {

    const pathname = usePathname()
    const [disabled, setDisabled] = useState<boolean>(false)
    const [comment, setComment] = useState<string>("")
    const [commented, setCommented] = useState<boolean>(false)
    const [resultComment, setResultComment] = useState<commentNode | undefined>(undefined)
    const [errorMsg, setErrorMsg] = useState<string>("")

    const createComment = async () => {
      setDisabled(true)
      if(comment.trim() !== "") {
        const result = await axios.post('/api/blog/comment', { comment, commentid: undefined, pathname })
        //console.log(result.data.data)
        if(result.status === 200 && result.data.data.createComment !== null) {
            setCommented(result.data.data.createComment.success)
            setResultComment({ node: result.data.data.createComment.comment })
            setErrorMsg("")
        } else {
            setCommented(false)
            setErrorMsg(result.data.errors[0].message)
            setResultComment({ node: result.data.data.createComment })
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
        <CommentContent comment={resultComment} mL={0} setShowReply={null} />
      }
      <hr className='my-10' />
      <div className='bg-red-300 text-red-600' style={animateErrorComponent(commented, errorMsg)}>
        {parse(errorMsg)}
      </div>
      <div className='flex flex-col mt-3 relative'>
        {disabled &&
          <div className='absolute' style={{ top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <LoadingPage small={true} textShow='Cargando comentario...' mY={1} />
          </div>
        }
          <textarea className='p-2 text-sm h-32 mb-3' onChange={(e) => setComment(e.target.value)} disabled={disabled} value={comment}></textarea>
          <div className='self-center'>
              <button className='buttonStyle w-[5rem] mr-2' onClick={() => createComment()} disabled={disabled}>{disabled ? "Cargando..." : "Responder"}</button>
              <button className='buttonStyle w-[5rem]' onClick={() => setComment("")}>Limpiar</button>
          </div>
      </div>
    </>
  )
}

export default CreateStartComment