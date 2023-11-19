"use client"
import React, { useState, useEffect } from 'react'
import axios from "axios";
import Image from "next/image";
import parse from 'html-react-parser';
import { Game } from "@/app/models/Games"

function gamePage({ params }: { params: { id: number | undefined | null }}) {

    const [infoGame, setInfoGame] = useState<Game>()
    const [videosYT, setVideosYT] = useState<Object>()


    useEffect(() => {
        const getGameInfoWhileLoading = async () => {
            if(params.id && infoGame !== null || undefined) {
                const result = await axios.get('/api/search/'+params.id)
                //console.log(result.data)
                setInfoGame(result.data)
                //const videos = await axios.post('/api/youtube', { game: result.data.name })
                //setVideosYT(videos)
            }
        };
        getGameInfoWhileLoading()
    }, [infoGame]);

    return (
        <div className='container bg-slate-200 dark:bg-slate-900 rounded-sm p-5'>
            {infoGame && 
                <div className='flex items-start'>
                    <Image src={infoGame?.background_image || ""} alt={infoGame?.name}
                        width={400}
                        height={400}
                        className="mr-2"
                    />
                    <div className='ml-2'>
                        <div className="font-bold text-4xl mb-2">{infoGame?.name}</div>
                        <div className="flex mb-2 italic">{infoGame?.platforms?.map((platform, i) => {
                            if(i+1 !== infoGame?.platforms?.length) {
                                return (<div className="text-sm" key={platform?.platform.id}>{platform?.platform.name}&nbsp;-&nbsp;</div>)
                            } else {
                                return (<div className="text-sm" key={platform?.platform.id}>{platform?.platform.name}</div>)
                            }
                        })}</div>
                        <div className="text-md max-h-[215px] overflow-auto h-auto">{parse(infoGame?.description || "")}</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default gamePage