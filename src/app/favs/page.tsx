"use client"
import { useState, useEffect } from 'react'
import { getLocalInfo } from '@/app/utils/storage'
import LoadingPage from '@/app/components/Loading'
import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('@/app/components/Favs/Favs'), { ssr: false })

function MyFavs() {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const favs: number[] = isClient ? getLocalInfo("allGamesFav") : []

    return (
        <>
            {!isClient &&
                <LoadingPage />
            }
            {!favs.length && 
                <div className='container mx-auto flex justify-center h-32 bg-slate-200 dark:bg-slate-900 rounded-sm p-3'>
                    <div className='self-center'>No tienes ningún juego favorito.</div>
                </div>
            }
            {favs.length !== 0 &&
                <div className='container mx-auto grid grid-cols-3'>
                    {favs.map((fav: number) => (
                        <NoSSR key={fav} fav={fav} />
                    ))}
                </div>
            }
        </>
    )

}

export default MyFavs