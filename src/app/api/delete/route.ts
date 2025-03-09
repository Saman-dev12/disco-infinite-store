import { db } from "@/db/db";
import authOptions from "@/lib/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    const session =  await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {

        const imagePresent = await db.image.findFirst({
            where: {
                id: id as string
            }
        })

        if(!imagePresent){
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        const res= await db.image.delete({
            where: {
                id: id as string
            }
        })
        if(!res){
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
    }catch (error) {
        NextResponse.json({ error: "Error deleting image" }, { status: 500 });
    }
}