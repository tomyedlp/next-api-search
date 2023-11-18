import Image from "next/image";
import { Games, Game } from "@/app/models/Games";

function ListSearching(data: Games) {
  console.log(data);
  return (
    <div className='w-1/2 justify-self-center mt-1 pr-1 max-h-72 h-auto overflow-auto shadow-lg shadow-indigo-500/40'>
        {data.games && data.games.map((game: Game) => (
          <div className="divSearchingFocus" key={game.id}>
            <Image src={game.background_image} alt={game.name}
              width={100}
              height={100}
              className="mr-2"
            />
            <div>
              <div className="font-bold text-lg">{game.name}</div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ListSearching