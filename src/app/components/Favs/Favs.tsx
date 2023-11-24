import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Game } from "@/app/models/Games"
import Image from "next/image";
import Link from "next/link";
import axios from 'axios'
import IconsFav from './IconsFav';
import { checkFav } from '@/app/utils/storage';
import LoadingPage from '@/app/components/Loading';

const getGameInfo = async (id: number, iconFav: boolean, setIconFav: Dispatch<SetStateAction<boolean>>, resultGame: Game | undefined) => {

    if(resultGame === undefined) {
        return <LoadingPage small />
    }

    if(resultGame) {
       return (
            <>
                <Image src={resultGame?.background_image || ""} alt={resultGame?.name}
                    width={200}
                    height={200}
                    className="mr-1"
                />
                <div className='ml-1 flex flex-col justify-between self-stretch w-full'>
                    <div className='flex'>
                        <div className="font-bold text-xl mb-2">{resultGame?.name}</div>
                    </div>
                    <div className='flex justify-end'>
                        <IconsFav iconFav={iconFav} setIconFav={setIconFav} id={id} />
                    </div>
                </div>
            </>
        )
    }
};

function FavGame(params: { fav: number }) {

    const [iconFav, setIconFav] = useState<boolean>(false)
    const [resultGame, setResultGame] = useState<Game>()

    useEffect(() => {
        const getGameInfoWhileLoading = async () => {
            if(resultGame === undefined) {
                const result = await axios.get('/api/search/'+params.fav.toString())
                setResultGame(result.data)
            }
        }
        getGameInfoWhileLoading()
    }, [resultGame])

    useEffect(() => {
        setIconFav(checkFav(params.fav))
    }, [iconFav])

    if(iconFav) {
        return (
            <div className='bg-slate-200 dark:bg-slate-900 rounded-sm p-3'>
                <Link href={'/game/'+params.fav}>
                    <div className='flex items-start'>
                        {getGameInfo(params.fav, iconFav, setIconFav, resultGame)}
                    </div>
                </Link>
            </div>
        )
    }
  
}

export default FavGame