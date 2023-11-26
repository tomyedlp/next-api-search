"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Game } from "@/app/models/Games"
import Image from "next/image";
import Link from "next/link";
import LoadingPage from '@/app/components/Loading';
import Stars from './Stars';

function StarsGame(params: { id: string, value: number }) {

    const [resultGame, setResultGame] = useState<Game>()

    useEffect(() => {
        const getGameInfoWhileLoading = async () => {
            if(resultGame === undefined) {
                const result = await axios.get('/api/search/'+params.id)
                setResultGame(result.data)
            }
        }
        getGameInfoWhileLoading()
    }, [resultGame])

    if(resultGame === undefined) {
        return <LoadingPage small />
    }

  return (
        <div className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 transition linear delay-150 rounded-sm p-3 mr-3 relative">
            <Link href={'/game/'+params.id} className="w-full flex items-start">
                <Image src={resultGame?.background_image || ""} alt={resultGame?.name || ""}
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
            <div className='absolute right-2 bottom-[1rem]'>
                <Stars id={parseInt(params.id)} rating={params.value} />
            </div>
        </div>
  )
}

export default StarsGame