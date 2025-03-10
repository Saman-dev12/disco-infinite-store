import { db } from "@/db/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const image = await db.image.findFirst({
      where: {
        id: id,
      },
      select: {
        cdn: true,
      },
    })

    if (!image || !image.cdn) {
      return new NextResponse("Image not found", { status: 404 })
    }

    // Redirect to the CDN URL
    return NextResponse.redirect(image.cdn)
  } catch (error) {
    console.error("Error fetching image:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

