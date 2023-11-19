"use client"
import React, { useState, useEffect } from 'react'
import { FiSearch } from "react-icons/fi";
import ListSearching from "@/app/components/Search/ListSearching"
import { Game } from "@/app/models/Games";
import axios from "axios";

function SearchInput() {

  const [game, setGame] = useState<string>("");
  const [results, setResults] = useState<Game[] | undefined>();
  const [showList, setShowList] = useState<boolean>(false);

  useEffect(() => {
    const getGamesWhileTyping = async () => {
      if(game.length > 3) {
        const result = await axios.post('/api/search', { game })
        //console.log(result.data.results)
        setResults(result?.data.results);
        setShowList(true);
      } else {
        setShowList(false);
      }
    };
    getGamesWhileTyping()
  }, [game]);

  const onSubmit = async () => {
    const result = await axios.post('/api/search', { game })
    //console.log(result.data);
  }

  return (
    <>
      <div className='mx-auto w-1/2 relative justify-self-center'>
          <div>Busque su videojuego favorito</div>
          <input type="text"
              className='rounded-md p-2 w-full border-solid border-2 border-slate-950 dark:border-slate-100'
              value={game}
              id="game"
              placeholder='Escriba el nombre de algún videojuego...'
              onChange={(e) => setGame(e.target.value)}
          />
          <div className='absolute end-3 top-8' onClick={onSubmit}>
            <FiSearch size={25} cursor="pointer" />
          </div>
      </div>
      {showList && 
        <ListSearching games={results || []} />
      }
    </>
  )
}

export default SearchInput