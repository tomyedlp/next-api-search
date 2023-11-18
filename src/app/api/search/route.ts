import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    const data = await request.json();
    const result = await axios.get(process.env.URL_RAWG+'games?search='+data.game+'&page_size=10&search_precise=true'+'&key='+process.env.API_KEY_SECRET)
    return NextResponse.json(result.data)
}