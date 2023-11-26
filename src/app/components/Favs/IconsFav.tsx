import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { setFav } from '@/app/utils/storage';
import { AreYouSureModal } from '@/app/components/Modal';

interface iconsInterface {
  setIconFav: Dispatch<SetStateAction<boolean>>,
  iconFav: boolean, 
  id: number | null | undefined,
  sure?: boolean,
  nameGame?: string
}

function IconsFav({ setIconFav, iconFav, id, sure = false, nameGame = "" }: iconsInterface) {

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmChangeFav, setConfirmChange] = useState<boolean>(false)

  const areYouSure = () => {
    if(sure) {
      setOpenModal(true)
    } else {
      setFav(id);
      setIconFav((prevState: boolean) => !prevState)
    }
  }

  useEffect(() => {
    if(confirmChangeFav) {
      setFav(id);
      setIconFav((prevState: boolean) => !prevState)
    }
  }, [confirmChangeFav])


  return (
    <>
        {!iconFav &&
            <MdFavoriteBorder size={25} onClick={() => {areYouSure()}} className="cursor-pointer hover:scale-125 transition ease-linear delay-0" />
        }
        {iconFav && 
            <MdFavorite size={25} onClick={() => {areYouSure()}}  className="cursor-pointer hover:scale-125 transition ease-linear delay-0" />
        }
        {openModal &&
          <AreYouSureModal setOpenModal={setOpenModal} setConfirmChange={setConfirmChange} nameGame={nameGame} />
        }
    </>
  )
}

export default IconsFav