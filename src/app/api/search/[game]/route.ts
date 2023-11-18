import { NextResponse } from "next/server";
import axios from "axios";

interface Params {
    params: { game: string }
}

export async function GET(request: Request, { params }: Params) {
    console.log(params)
    return NextResponse.json({ test: "AA" });
}

export async function POST(request: Request) {
    const data = await request.json();
    console.log(data);
    return NextResponse.json(data);
}