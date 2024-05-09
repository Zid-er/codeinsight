import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { ded } from "~/utils/decoder";

// TODO post create enum tag

export async function POST(req: Request) {
    try {
        const user = await ded(req)
        if (!user) return NextResponse.json({ message: "Unauthorized!" }, { status: 404 })
        console.log("USER: ", user)
        const { title, description, tag, imgUrl, projectId } = await req.json();
        if (!title || !description || !tag || !projectId) return NextResponse.json({ message: "Empty fields!" }, { status: 404 })
        if (imgUrl) {
            const createRes = await db.post.create({
                data: {
                    title: title,
                    description: description,
                    tag: tag,
                    ownerId: user.payload.userId,
                    projectId: projectId
                }
            })
            console.log("POST CREATE RES: ", createRes)
            const addImage = await db.image.create({
                data: {
                    url: imgUrl,
                    postId: createRes.id
                }
            })
            console.log("ADDED IMAGE: ", addImage)
            return NextResponse.json({ message: "Created Post With Image" }, { status: 200 });
        }
        await db.post.create({
            data: {
                title: title,
                description: description,
                tag: tag,
                ownerId: user.payload.userId
            }
        })
        return NextResponse.json({ message: "Created Post" }, { status: 200 });

    } catch (err) {
        console.log("[ERR IN POST CREATE] : ", err)
        throw new Error("Err In Post Create!")
    }
}