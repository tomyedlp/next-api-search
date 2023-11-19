import { NextResponse } from "next/server";
import axios from "axios";

interface Params {
    params: { game: string }
}

export async function GET(request: Request, { params }: Params) {
    const result = await axios.get(process.env.URL_RAWG+'games/'+params.game+'?key='+process.env.API_KEY_SECRET)
    return NextResponse.json(result.data)
}