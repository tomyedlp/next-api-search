import React, { useState } from 'react'

function CreateStartComment() {

    const [comment, setComment] = useState<string>("")

    const createComment = () => {
        //axios
    }

  return (
    <div className='flex flex-col'>
        <textarea className='p-2 text-sm h-32 mb-3' onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
        <div className='self-center'>
            <button className='buttonStyle w-[5rem] mr-2' onClick={() => createComment()}>Escribir</button>
            <button className='buttonStyle w-[5rem]' onClick={() => setComment("")}>Limpiar</button>
        </div>
    </div>
  )
}

export default CreateStartComment