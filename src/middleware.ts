import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "~/env";
import * as jose from "jose";

const protectedRoutes = ["/create"];


const jwtConfig = {
    secret: new TextEncoder().encode(env.SECRET),
}

export default async function middleware(req: NextRequest) {
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        const cookie = req.headers.get("cookie")
        if (!cookie) {
            console.log("[IN MIDDLE WARE !cookie]")
            const absoluteURL = new URL("/login", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL)
        }
        const token = cookie.split("=")[1]
        if (token) {
            try {
                const decoded:any = await jose.jwtVerify(token, jwtConfig.secret)
                console.log("DECODED JOSE: ", decoded)
            } catch (err) {
                console.log("[IN MIDDLE WARE IS ERR]")
                const absoluteURL = new URL("/login", req.nextUrl.origin);
                return NextResponse.redirect(absoluteURL)
            }
    
        } else {
            console.log("[IN MIDDLE WARE NO TOKEN]")
            const absoluteURL = new URL("/login", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL)
        }

    }
}





// const newUrl = new URL(req.url)
// const newUrl = new URL("/login")


// if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
//     console.log("[IN MIDDLE WARE]")
//     const absoluteURL = new URL("/login", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL)
// }