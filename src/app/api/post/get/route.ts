import { NextResponse, type NextRequest } from "next/server";
import { db } from "~/server/db";


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const tags = searchParams.get("tags") ? searchParams.get("tags")!.split(",") : [];
  try {
    const whereClause = tags.length > 0 ? { tag: { in: tags } } : {};
    const posts = await db.post.findMany({
      where: whereClause,
    })
    return NextResponse.json({ message: "Got posts", posts: posts }, { status: 200 });

  } catch (err) {
    console.log("[ERR IN GET POSTS] [posts many] : ", err)
    throw new Error("Err In GET POSTS [posts many]!")
  }
}
