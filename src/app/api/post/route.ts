import { NextResponse } from "next/server";
import { db } from "~/server/db";

// TODO post create enum tag

export async function POST(req: Request) {
    try {
        const { title, description, tag } = await req.json();
        if (!title || !description || !tag) return NextResponse.json({ message: "Empty fields!" }, { status: 404 })
        await db.post.create({
            data: {
                title: title,
                description: description,
                tag: tag
            }
        })
      return NextResponse.json({ message: "Created Post" }, { status: 200 });

    } catch (err) {
        console.log("[ERR IN POST CREATE] : ", err)
        throw new Error("Err In Post Create!")
    }
}