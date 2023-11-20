import React from 'react'
import Image from "next/image";
import Link from "next/link";
import axios from 'axios'

const getGameInfo = async (id: number) => {
    const result = await axios.get('/api/search/'+id.toString())
    return (
        <>
            <Image src={result?.data.background_image || ""} alt={result?.data.name}
                width={200}
                height={200}
                className="mr-1"
            />
            <div className='ml-1'>
                <div className='flex justify-between'>
                    <div className="font-bold text-xl mb-2">{result?.data.name}</div>
                    <div className='self-center'>
                        {/* {!iconFav &&
                            <MdFavoriteBorder size={25} onClick={() => {setFav(infoGame.id);setIconFav(prevState => !prevState)}} className="cursor-pointer" />
                            
                        }
                        {iconFav && 
                            <MdFavorite size={25} onClick={() => {setFav(infoGame.id);setIconFav(prevState => !prevState)}}  className="cursor-pointer" />
                        } */}
                    </div>
                </div>
            </div>
        </>
    )
};

function FavGame(params: { fav: number }) {
  return (
        <div className='bg-slate-200 dark:bg-slate-900 rounded-sm p-3'>
            <Link href={'/game/'+params.fav}>
                <div className='flex items-start'>
                    {getGameInfo(params.fav)}
                </div>
            </Link>
        </div>
  )
}

export default FavGame