import { db } from "@/db/db";
import {client} from "@/lib/DiscordClient";
import authOptions from "@/lib/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.formData();
        const file = data.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buff = Buffer.from(arrayBuffer);

        const res: any = await client.post(
            `/channels/${process.env.DISCORD_CHANNEL_ID}/messages`,
            {
                files: [{ name: file.name, data: buff,contentType:file.type || 'image/png',key:file.name }],
            }
        );
        
        console.log(file.type)

        const cdnUrl = res?.attachments?.[0]?.url || null;
        if(cdnUrl){
            await db.image.create({
                data: {
                    id:res.attachments[0].id,
                    cdn:cdnUrl,
                    name:file.name,
                    userId:session.user.id,
                }
            })
        }

        return NextResponse.json({ message:"File uploaded successfully" }, { status: 200 });

    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
