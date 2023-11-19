import React, { Dispatch, SetStateAction } from 'react'
import YouTube from 'react-youtube';
import { IoCloseCircleSharp } from "react-icons/io5";

function Modal(params: { selectedVideo: string, setOpenModal: Function }) {

    console.log(params);
    const closeModal = () => {
        params.setOpenModal(false)
    }

  return (
    <div className='fixed flex justify-center items-center top-0 left-0 h-screen w-full modalDiv'>
        <div className='opacity-90 absolute bg-neutral-400 dark:bg-neutral-900 p-2 h-screen w-full'></div>
        <div className='flex end-0 z-50 absolute top-5 right-5 cursor-pointer' onClick={closeModal}>
            <IoCloseCircleSharp size={45} />
        </div>
        <div className='opacity-100 z-50 relative top-5 flex border-solid border-b-gray-400 border-2'>
            <YouTube 
                videoId={params.selectedVideo}
                id={params.selectedVideo}
                className='bigYoutube'
            />
        </div>
    </div>
  )
}

export default Modal