"use client"

import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import parse from 'html-react-parser';
import YouTube, { YouTubeEvent } from 'react-youtube';
import { Game } from "@/app/models/Games"
import Stars from '@/app/components/Stars/Stars';
import LoadingPage from '@/app/components/Loading';
import Modal from '@/app/components/Modal';
import IconsFav from '@/app/components/Favs/IconsFav';
import { setIdToValue, checkLocalStorage } from '@/app/utils/storage';


function gamePage({ params }: { params: { id: number | undefined | null }}) {

    const [infoGame, setInfoGame] = useState<Game>()
    const [videosYT, setVideosYT] = useState<Array<string>>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedVideo, setSelectedVideo] = useState<string>("")
    const [iconFav, setIconFav] = useState<boolean>(false)
    const [playing, setPlaying] = useState<number>(0)
    const [yourNotes, setYourNotes] = useState<string>("")

    useEffect(() => {
        const getGameInfoWhileLoading = async () => {
            if(infoGame === undefined) {
                const result = await axios.get('/api/search/'+params.id)
                //console.log(result.data)
                setInfoGame(result.data)
                setIconFav(checkLocalStorage(result.data.id, "allGamesFav"))
                setPlaying(checkLocalStorage(result.data.id, "allGamesPlaying"))
                setYourNotes(checkLocalStorage(result.data.id, "allGamesNotes"))
                document.title = result.data?.name + " - VideoGames API"
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

    const selectRunGame = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(typeof infoGame?.id === "number") {
            setIdToValue("allGamesPlaying", infoGame?.id, parseInt(e.target.value))
            setPlaying(parseInt(e.target.value))
        }
    }

    const addingNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(typeof infoGame?.id === "number") {
            setIdToValue("allGamesNotes", infoGame?.id, e.target.value)
            setYourNotes(e.target.value)
        }
    }


    return (
        <div className='container mx-auto bg-slate-200 dark:bg-slate-900 rounded-sm p-5'>
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
                        <div className='mb-10'>
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
                        <hr />
                        <div className='mt-5'>
                            <div className="font-bold text-lg">Tu información acerca del juego: </div>
                            <div className='flex flex-col'>
                                <div className='flex my-3'>
                                    <span className='w-56 mr-3 self-center min-w-'>Tu rating:</span> <Stars id={infoGame?.id} rating={null} />
                                </div>
                                <div className='flex my-3'>
                                    <span className='w-56 mr-3 self-center'>Resultado del juego:</span> 
                                    <select className='w-72 px-1 py-2' onChange={(e) => selectRunGame(e)} value={playing}>
                                        <option value="0">No iniciado</option>
                                        <option value="1">Jugando</option>
                                        <option value="2">Finalizado</option>
                                        <option value="3">Abandonado</option>
                                        <option value="4">En espera</option>
                                    </select>
                                </div>
                                <div className='flex my-3'>
                                    <span className='w-56 mr-3 self-center'>Tus notas:</span> 
                                    <textarea placeholder='Escriba algo...' className='w-72 h-32 p-1' onChange={(e) => addingNotes(e)} value={yourNotes}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default gamePage