import { NextResponse } from "next/server";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
    //obtenemos el id


    //return NextResponse.json(tasks);
}