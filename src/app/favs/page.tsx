"use client"
import React, { useState, useEffect } from 'react'
import { getFavs } from '@/app/utils/storage'
import LoadingPage from '@/app/components/Loading'
import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('@/app/components/Favs/Favs'), { ssr: false })

function MyFavs() {

    const favs: number[] = getFavs()

    return (
        <>
            <div className='grid grid-cols-3'>
                {favs.map((fav: number) => (
                    <NoSSR key={fav} fav={fav} />
                ))}
            </div>
        </>
    )

}

export default MyFavs