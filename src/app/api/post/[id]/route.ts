import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		const post = await db.post.findUnique({
			where: {
				id
			},
		})
		if (!post) return NextResponse.json({ message: "Post Not Found!" }, { status: 404 });
		return NextResponse.json({ ...post }, { status: 200 });

	} catch (err) {
		console.log("[ERR IN GET POSTS [id]] : ", err)
		throw new Error("Err In GET POSTS [id]!")
	}
}
