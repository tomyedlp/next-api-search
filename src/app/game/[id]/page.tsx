"use client"
import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';
import { Game } from "@/app/models/Games"
import LoadingPage from '@/app/components/Loading';
import YouTube from 'react-youtube';

function gamePage({ params }: { params: { id: number | undefined | null }}) {

    const [infoGame, setInfoGame] = useState<Game>()
    const [videosYT, setVideosYT] = useState<Array<string>>([])


    useEffect(() => {
        const getGameInfoWhileLoading = async () => {
            if(infoGame === undefined) {
                const result = await axios.get('/api/search/'+params.id)
                //console.log(result.data)
                setInfoGame(result.data)
            }
            return infoGame
        };
        const getVideosWhileLoading = async (result: Game | undefined) => {
            if(infoGame !== undefined) {
                const videos: AxiosResponse = await axios.post('/api/youtube', { name: result?.name })
                setVideosYT(videos.data)
            }
        };
        const fetchData = async () => {
            if(params.id) {
                try {
                    const result = await getGameInfoWhileLoading();
                    await getVideosWhileLoading(result);
                } catch(error) {
                    console.log(error)
                }
                
            }
        }
        fetchData();
    }, [infoGame]);

    return (
        <div className='container bg-slate-200 dark:bg-slate-900 rounded-sm p-5'>
            {!infoGame && 
                <LoadingPage />
            }
            {infoGame &&
                <>
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
                    <div className='mt-10'>
                        <div>
                            <div>Gameplay disponibles: </div>
                            <div>
                                {videosYT.map((video) => (
                                    <YouTube 
                                        key={video} 
                                        videoId={video}
                                        id={video}
                                    />
                                ))}
                            </div>
                        </div>
                        
                    </div>
                </>
            }
        </div>
    )
}

export default gamePage