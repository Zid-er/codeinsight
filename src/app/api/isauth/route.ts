import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "~/env";

export async function GET(req: Request) {
    try {
        console.log(req.headers.get("cookie"))
        const cookie = req.headers.get("cookie")
        if (!cookie) {
            return NextResponse.json({ message: "Got no cookie!", isauth: false }, { status: 404 });
        }
        const token = cookie.split("=")[1]
        if (token) {
            const decoded = jwt.verify(token, env.SECRET)
            return NextResponse.json({ message: "Got a token!", isauth: true, user: decoded }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Got no token!", isauth: false }, { status: 404 });
        }

    } catch (err) {
        console.log("[ERR IN GET POSTS] : ", err)
        throw new Error("Err In GET POSTS!")
    }
}