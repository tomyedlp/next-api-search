import React, { Dispatch, SetStateAction } from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { setFav } from '@/app/utils/storage';

interface iconsInterface {
  setIconFav: Dispatch<SetStateAction<boolean>>,
  iconFav: boolean, 
  id: number | null | undefined
}

function IconsFav({ setIconFav, iconFav, id }: iconsInterface) {
  return (
    <>
        {!iconFav &&
            <MdFavoriteBorder size={25} onClick={() => {setFav(id);setIconFav((prevState: boolean) => !prevState)}} className="cursor-pointer" />
        }
        {iconFav && 
            <MdFavorite size={25} onClick={() => {setFav(id);setIconFav((prevState: boolean) => !prevState)}}  className="cursor-pointer" />
        }
    </>
  )
}

export default IconsFav