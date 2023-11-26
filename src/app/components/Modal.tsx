import React, { Dispatch, SetStateAction } from 'react'
import YouTube from 'react-youtube';
import { IoCloseCircleSharp } from "react-icons/io5";

function Modal(params: { selectedVideo: string, setOpenModal: Dispatch<SetStateAction<boolean>> }) {

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

export function AreYouSureModal(params: { setOpenModal: Dispatch<SetStateAction<boolean>>, setConfirmChange: Dispatch<SetStateAction<boolean>>, nameGame: string }) {

    const closeModal = () => {
        params.setOpenModal(false)
        params.setConfirmChange(false)
    }

    const confirmChange = (bool: boolean) => {
        params.setOpenModal(false)
        params.setConfirmChange(bool)
    }

  return (
    <div className='fixed flex justify-center items-center top-1/4 right-1/4 w-1/2 max-w-1/2 min-h-32 modalDiv'>
        <div className='opacity-90 absolute bg-neutral-400 dark:bg-neutral-900 p-2 h-full w-full border-solid border-b-gray-400 border-2 rounded-lg'></div>
        <div className='flex end-0 z-50 absolute top-5 right-5 cursor-pointer' onClick={closeModal}>
            <IoCloseCircleSharp size={45} />
        </div>
        <div className='opacity-100 z-50 relative pt-[75px] pb-5'>
            <div className="text-2xl text-center">¿Seguro que deseas eliminar de los favoritos el juego <span className="italic">{params.nameGame}</span>?</div>
            <div className='flex justify-around mt-5 mb-5'>
                <button className="buttonStyle" onClick={() => confirmChange(true)}>Sí</button>
                <button className="buttonStyle" onClick={() => confirmChange(false)}>No</button>
            </div>
            
        </div>
    </div>
  )
}

export default Modal