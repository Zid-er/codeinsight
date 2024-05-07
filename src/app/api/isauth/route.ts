import * as jose from "jose";
import { NextResponse } from "next/server";
import { env } from "~/env";

const jwtConfig = {
    secret: new TextEncoder().encode(env.SECRET),
}

export async function GET(req: Request) {
    try {
        const cookie = req.headers.get("cookie")
        if (!cookie) {
            return NextResponse.json({ message: "Got no cookie!", isauth: false }, { status: 404 });
        }
        const token = cookie.split("=")[1]
        if (token) {
            try {
                const decoded:any = await jose.jwtVerify(token, jwtConfig.secret)
                console.log("DECODED RES: ", decoded)
                return NextResponse.json({ message: "Got a token!", isauth: true, user: decoded }, { status: 200 });

            } catch(err) {
                return NextResponse.json({ message: "Bad token!", isauth: false }, { status: 404 });
            }
        } else {
            return NextResponse.json({ message: "Got no token!", isauth: false }, { status: 404 });
        }
    } catch (err) {
        console.log("[ERR IN GET POSTS] : ", err)
        throw new Error("Err In GET POSTS!")
    }
}


// const decoded:any = jwt.verify(token, env.SECRET, (err, data) => {
//     console.log("ERR DATA: ", err, data)
//     if (err) {
//         return { err: true }
//     } else {
//         return data
//     }
// })