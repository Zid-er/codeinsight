import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { ded } from "~/utils/decoder";

// TODO post create enum tag

export async function POST(req: Request) {
    try {
        const user = await ded(req)
        if (!user) return NextResponse.json({ message: "Unauthorized!" }, { status: 404 })
        console.log("USER: ", user)
        const { title, description, tag } = await req.json();
        if (!title || !description || !tag) return NextResponse.json({ message: "Empty fields!" }, { status: 404 })
        await db.project.create({
            data: {
                name: title,
                gist: description,
                tag: tag,
                ownerId: user.payload.userId
            }
        })
        return NextResponse.json({ message: "Created project!" }, { status: 200 });

    } catch (err) {
        console.log("[ERR IN project CREATE] : ", err)
        throw new Error("Err In project Create!")
    }
}