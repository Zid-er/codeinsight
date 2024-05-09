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
		if (!project.ownerId) return NextResponse.json({ message: "project user Not Found!" }, { status: 404 });
		const user = await db.user.findUnique({
			where: {
				id: project.ownerId
			},
			select: {
				username: true,
				id: true
			}
		})
		if (!user) return NextResponse.json({ message: "project user user Not Found!" }, { status: 404 });
		const posts = await db.post.findMany({
			where: {
				projectId: project.id
			}
		})
		console.log("posts: ", posts)
		if (posts.length) {
			const imaged_posts = await Promise.all(posts.map(async (post) => {
				const imgUrls = await db.image.findMany({
					where: {
						postId: post.id
					}
				})
				console.log("IMMMMMGGG URLLL: ", imgUrls)
				if (imgUrls.length) {
					return {...post, imgUrls: imgUrls }

				} else {
					return {...post, imgUrls: [] }
				}
			}))
			return NextResponse.json({user, ...project, posts: imaged_posts}, { status: 200 });
		} else return NextResponse.json({ message: "No posts!" }, { status: 404 });

	} catch (err) {
		console.log("[ERR IN GET project [id]] : ", err)
		throw new Error("Err In GET project [id]!")
	}
}
