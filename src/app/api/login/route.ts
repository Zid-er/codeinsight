import { NextResponse } from "next/server";
import { db } from "~/server/db";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import { cookies } from "next/headers";

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
            const token = jwt.sign({
                data: {
                    username: res.username,
                    userId: res.id
                }
            }, env.SECRET, { expiresIn: '1h' });
            cookies().set("token", token);
            return NextResponse.json({ message: "Found user!", token: token }, { status: 200 });
        } else {
            return NextResponse.json({ message: "User not found!" }, { status: 404 });
        }

    } catch (err) {
        console.log("[ERR IN LOGIN] : ", err)
        throw new Error("Err In LOGIN!")
    }
}