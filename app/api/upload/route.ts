// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ userId from frontend
    const { fileName, fileType, userId } = body;
    if (!userId) throw new Error("Missing userId");

    // ✅ folder structure
    const key = `documents/${userId}/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return NextResponse.json({ uploadUrl, key });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
