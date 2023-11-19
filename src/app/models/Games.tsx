export interface Game {
    id: number | null | undefined,
    name: string,
    background_image?: string,
    description?: string | undefined,
    released?: string,
    platforms?: Array<{ platform: { id: number, name: string }}>

}
  
export interface Games {
    games: Game[]
}
  