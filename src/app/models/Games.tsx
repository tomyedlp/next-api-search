export interface Game {
    id: null | undefined,
    name: string,
    background_image: string
}
  
export interface Games {
    games: Game[]
}
  