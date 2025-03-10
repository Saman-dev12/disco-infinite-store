import { db } from "@/db/db";
import authOptions from "@/lib/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_:NextRequest){

    const session = await getServerSession(authOptions);
    
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log(session.user.id)

    try {
        const res = await db.image.findMany({
            where:{
                userId:session.user.id
            }
        })

        return NextResponse.json({Files:res},{status:200});

    } catch (error) {
        console.error("Error fetching Files:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}