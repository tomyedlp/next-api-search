import { NextResponse } from "next/server";
import { Client } from "youtubei";

export async function POST(request: Request) {
    const data = await request.json();
    const year = new Date(data.released).getFullYear()
    const youtube = new Client();
    const videos = await youtube.search(data.name+" "+year, {
		type: "video", // video | playlist | channel | all
	});

    let arrayVideos: Array<string> = []
    let count = 1;
    videos.items.map((video) => {
        if(count <= 3) {
            arrayVideos.push(video.id);
        }
        count++;
    })
    return NextResponse.json(arrayVideos)
}