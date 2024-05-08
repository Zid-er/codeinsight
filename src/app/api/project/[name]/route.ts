import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: Request, { params }: { params: { name: string } }) {
	try {
        const name = params.name
		const project = await db.project.findFirst({
			where: {
				name: name
			},
		})
		if (!project) return NextResponse.json({ message: "project Not Found!" }, { status: 404 });
		return NextResponse.json({ ...project }, { status: 200 });

	} catch (err) {
		console.log("[ERR IN GET project [id]] : ", err)
		throw new Error("Err In GET project [id]!")
	}
}
