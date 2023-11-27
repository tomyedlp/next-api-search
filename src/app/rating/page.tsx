"use client"
import React, { useState, useEffect } from 'react'
import { getLocalInfo } from '@/app/utils/storage'
import StarsGame from "@/app/components/Stars/StarsGame"
import LoadingPage from '@/app/components/Loading';

function Rating() {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const rating: any = isClient ? getLocalInfo("allGamesStarsRating") : []

    const starGamesLooping = () => {
        return Object.keys(rating).map((id) => (
            <StarsGame key={id} id={id} value={rating[id]} />
        ));
    }

    {!isClient &&
        <LoadingPage />
    }
    {!Object.keys(rating).length && 
        <div className='container mx-auto flex justify-center h-32 bg-slate-200 dark:bg-slate-900 rounded-sm p-3'>
            <div className='self-center'>No has valorado ningún juego todavía.</div>
        </div>
    }

    return (
        <div className='container mx-auto grid grid-cols-3'>
            {starGamesLooping()}
        </div>
    )

}

export default Rating