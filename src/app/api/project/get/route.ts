import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: Request, { params }: { params: { name: string } }) {
	try {
		const project = await db.project.findMany({})
		if (!project) return NextResponse.json({ message: "projects Not Found!" }, { status: 404 });
		return NextResponse.json(project, { status: 200 });

	} catch (err) {
		console.log("[ERR IN GET projects [id]] : ", err)
		throw new Error("Err In GET projects [id]!")
	}
}
