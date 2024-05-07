import { NextResponse } from "next/server";
import { db } from "~/server/db";


export async function GET(req: Request) {
    try {
        const posts = await db.post.findMany()
        return NextResponse.json({ message: "Got posts", posts: posts }, { status: 200 });

    } catch (err) {
        console.log("[ERR IN GET POSTS] [posts many] : ", err)
        throw new Error("Err In GET POSTS [posts many]!")
    }
}