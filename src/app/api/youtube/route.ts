import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    const data = await request.json();
    console.log(process.env.URL_YOUTUBE);
    const result = await axios.get(process.env.URL_YOUTUBE, {
        params: {
            type: "video",
            part: "snippet",
            q: data.game
        }
    })
    return NextResponse.json(result)
}