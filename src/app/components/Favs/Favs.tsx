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
                <Link href={'/game/'+id} className="w-full flex items-start">
                    <Image src={resultGame?.background_image || ""} alt={resultGame?.name}
                        width={200}
                        height={200}
                        className="mr-1"
                    />
                    <div className='ml-1 flex flex-col justify-between self-stretch w-full'>
                        <div className='flex sta'>
                            <div className="font-bold text-xl mb-2">{resultGame?.name}</div>
                        </div>
                    </div>
                </Link>
                <div className='absolute right-0 bottom-[0rem]'>
                    <IconsFav iconFav={iconFav} setIconFav={setIconFav} id={id} sure={true} nameGame={resultGame.name} />
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
            <div className='bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 transition linear delay-150 rounded-sm p-3 mr-3'>
                <div className='relative'>
                    {getGameInfo(params.fav, iconFav, setIconFav, resultGame)}
                </div>
            </div>
        )
    }
  
}

export default FavGame