"use client"
import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';
import YouTube, { YouTubeEvent } from 'react-youtube';
import { Game } from "@/app/models/Games"
import Stars from '@/app/components/Stars/Stars';
import LoadingPage from '@/app/components/Loading';
import Modal from '@/app/components/Modal';
import IconsFav from '@/app/components/Favs/IconsFav';
import { checkLocalStorage } from '@/app/utils/storage';

function gamePage({ params }: { params: { id: number | undefined | null }}) {

    const [infoGame, setInfoGame] = useState<Game>()
    const [videosYT, setVideosYT] = useState<Array<string>>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedVideo, setSelectedVideo] = useState<string>("")
    const [iconFav, setIconFav] = useState<boolean>(false)

    useEffect(() => {
        const getGameInfoWhileLoading = async () => {
            if(infoGame === undefined) {
                const result = await axios.get('/api/search/'+params.id)
                //console.log(result.data)
                setInfoGame(result.data)
                setIconFav(checkLocalStorage(result.data.id, "allGamesFav"))
            }
            return infoGame
        };
        const getVideosWhileLoading = async (result: Game | undefined) => {
            if(infoGame !== undefined) {
                const videos: AxiosResponse = await axios.post('/api/youtube', { name: result?.name, released: result?.released })
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

    useEffect(() => {
        setIconFav(checkLocalStorage(infoGame?.id, "allGamesFav"))
    }, [iconFav])
    
    const openModalYoutube = (e: YouTubeEvent, video: string) => {
        e.target.pauseVideo();
        setSelectedVideo(video)
        setOpenModal(true)
    }

    return (
        <div className='container bg-slate-200 dark:bg-slate-900 rounded-sm p-5'>
            {!infoGame && 
                <LoadingPage />
            }
            {infoGame &&
                <>
                    {openModal &&
                        <Modal selectedVideo={selectedVideo} setOpenModal={setOpenModal} />
                    }

                    <div className='flex items-start'>
                        <Image src={infoGame?.background_image || ""} alt={infoGame?.name}
                            width={400}
                            height={400}
                            className="mr-2"
                        />
                        <div className='ml-2 w-full'>
                            <div className='flex justify-between w-full'>
                                <div className="font-bold text-4xl mb-2">{infoGame?.name}</div>
                                <div className='self-center'>
                                    <IconsFav iconFav={iconFav} setIconFav={setIconFav} id={infoGame?.id} />
                                </div>
                            </div>
                            <div className="flex mb-2 italic">{infoGame?.platforms?.map((platform, i) => {
                                let last = i+1 !== infoGame?.platforms?.length ? parse("&nbsp;-&nbsp;") : ""
                                return (<div className="text-sm" key={platform?.platform.id}>{platform?.platform.name}{last}</div>)
                            })}</div>
                            <div className="text-md max-h-[215px] overflow-auto h-auto">{parse(infoGame?.description || "")}</div>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div>
                            <div>Gameplay disponibles: </div>
                            <div className='flex mt-2'>
                                {videosYT.map((video) => {
                                    const opts = {
                                        height: '124',
                                        width: '206',
                                      };
                                    return (
                                    <div key={video}>
                                        <YouTube 
                                            videoId={video}
                                            id={video}
                                            opts={opts}
                                            className='mr-2'
                                            onPlay={(e) => openModalYoutube(e, video)}
                                        />
                                    </div>)
                                })}
                            </div>
                        </div>
                        <div>
                            acá van los links/medios para comprar el juego.. 
                            <Stars id={infoGame?.id} rating={null} />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default gamePage