import { NextResponse } from "next/server";
import { db } from "~/server/db";
import * as bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { email, password, username } = await req.json();
        if (!email || !password || !username) return NextResponse.json({ message: "Empty fields!" }, { status: 404 })
        const isEmail = await db.user.findFirst({ where: { email: email } })
        if (isEmail) return NextResponse.json({ message: "Exists!" }, { status: 404 });
        let done = false
        const saltRounds = 10
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                // Store hash in your password DB.
                const res = await db.user.create({
                    data: {
                        email: email,
                        username: username,
                        hash: hash
                    }
                })
                console.log("RES CREATE USER: ", res)
                if (err) {
                    return NextResponse.json({ message: "User not created!" }, { status: 404 });
                }
            });
        });
        return NextResponse.json({ message: "Created user!" }, { status: 200 });

    } catch (err) {
        console.log("[ERR IN SIGN UP] : ", err)
        throw new Error("Err In SIGN UP!")
    }
}
