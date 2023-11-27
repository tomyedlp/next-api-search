"use client"
import React, { useState, useEffect } from 'react';
import { Rating } from 'react-custom-rating-component'
import { checkLocalStorage, setIdToValue } from '@/app/utils/storage'

function Stars(params: { id: number | undefined | null, rating: null | number}) {


    const [changedStars, setChangedStars] = useState<boolean>(false)
    const [stars, setStars] = useState<number>(params.rating === null ? checkLocalStorage(params.id, "allGamesStarsRating") : params.rating)

    const ratingChanged = (newRating: number) => {
        setStars(newRating)
        setChangedStars(true)
    }

    useEffect(() => {
        if(changedStars && typeof params.id === "number") {
            setIdToValue("allGamesStarsRating", params.id, stars)
        }
    }, [stars])

  return (
    <Rating
        defaultValue={stars}
        count={5}
        onChange={ratingChanged}
        size='30px'
        activeColor={'#ffd700'} 
        precision={0.5}
    />
  )
}

export default Stars