import { env } from "~/env";
import * as jose from "jose";
const jwtConfig = {
    secret: new TextEncoder().encode(env.SECRET),
}
export const ded = async (req: Request) => {
    const cookie = req.headers.get("cookie")
    if (!cookie) return null
    const token = cookie.split("=")[1]
    if (!token) return null
    const decoded:any = await jose.jwtVerify(token, jwtConfig.secret)
    console.log("DECODED: ", decoded)
    return decoded
}