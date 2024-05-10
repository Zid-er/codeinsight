import { NextResponse } from "next/server";
import { db } from "~/server/db";
import * as bcrypt from "bcrypt";
import { env } from "~/env";
import { cookies } from "next/headers";
import * as jose from "jose";

const jwtConfig = {
    secret: new TextEncoder().encode(env.SECRET),
}

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) return NextResponse.json({ message: "Empty fields!" }, { status: 404 })
        const res = await db.user.findFirst({ where: { email: email } })
        if (res) {
            // Load hash from your password DB.
            bcrypt.compare(password, res.hash, function(err, result) {
                if (err) {
                    return NextResponse.json({ message: "Err login!" }, { status: 404 });
                }
                console.log("LOG IN RESULT: ", result)
                // return NextResponse.json({ message: "Login success!", token: "123" }, { status: 404 });
            });
            console.log("USER: ", res)
            try {
                const alg = 'HS256'
                const token = await new jose.SignJWT({ 
                    username: res.username,
                    userId: res.id
                 })
                .setProtectedHeader({ alg })    
                .setIssuedAt()
                .setExpirationTime('24h')
                .sign(jwtConfig.secret)
                console.log("TOKEN IS: ", token)
                cookies().set("token", token);
                return NextResponse.json({ message: "Found user!", token: token, user: { payload: { username: res.username, userId: res.id }} }, { status: 200 });

            } catch (err) {
                return NextResponse.json({ message: "Err When Signing JWT!" }, { status: 404 });
            }
        } else {
            return NextResponse.json({ message: "User not found!" }, { status: 404 });
        }

    } catch (err) {
        console.log("[ERR IN LOGIN] : ", err)
        throw new Error("Err In LOGIN!")
    }
}



// const token = jwt.sign({
//     username: res.username,
//     userId: res.id
// }, env.SECRET, { expiresIn: '1m' });