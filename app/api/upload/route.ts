// // File: app/api/upload/route.ts
// import { NextResponse } from "next/server";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import crypto from "crypto";

// // Initialize S3 client with proper error handling
// let s3Client: S3Client | null = null;

// try {
//   if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
//     console.error("❌ Missing AWS credentials in environment variables");
//   } else if (!process.env.AWS_REGION) {
//     console.error("❌ Missing AWS_REGION in environment variables");
//   } else if (!process.env.NEXT_PUBLIC_S3_BUCKET) {
//     console.error("❌ Missing NEXT_PUBLIC_S3_BUCKET in environment variables");
//   } else {
//     s3Client = new S3Client({
//       region: process.env.AWS_REGION,
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       },
//     });
//     console.log("✅ S3 Client initialized successfully");
//   }
// } catch (error) {
//   console.error("❌ Failed to initialize S3 client:", error);
// }

// export async function POST(req: Request) {
//   try {
//     // Check if S3 client is available
//     if (!s3Client) {
//       console.error("❌ S3 client not initialized");
//       return NextResponse.json(
//         { error: "Server configuration error: AWS not properly configured" },
//         { status: 500 }
//       );
//     }

//     const body = await req.json();
//     console.log("📝 Upload request body:", body);

//     const { fileName, fileType, userId } = body;

//     // Validate required fields
//     if (!userId) {
//       console.error("❌ Missing userId");
//       return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//     }

//     if (!fileName) {
//       console.error("❌ Missing fileName");
//       return NextResponse.json({ error: "Missing fileName" }, { status: 400 });
//     }

//     if (!fileType) {
//       console.error("❌ Missing fileType");
//       return NextResponse.json({ error: "Missing fileType" }, { status: 400 });
//     }

//     // Extract and sanitize file extension
//     const ext = fileName.split(".").pop()?.toLowerCase() || "bin";
//     const safeExt = ext.replace(/[^a-z0-9]/g, "");

//     // Generate unique filename
//     const uuid = crypto.randomUUID().slice(0, 8);
//     const timestamp = Date.now();
//     const key = `documents/${userId}/${timestamp}-${uuid}.${safeExt}`;

//     console.log("📁 Generated S3 key:", key);
//     console.log("🪣 Using bucket:", process.env.NEXT_PUBLIC_S3_BUCKET);

//     // Create PutObject command
//     const command = new PutObjectCommand({
//       Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
//       Key: key,
//       ContentType: fileType,
//     });

//     // Generate pre-signed URL
//     const uploadUrl = await getSignedUrl(s3Client, command, { 
//       expiresIn: 3600 // 1 hour
//     });

//     console.log("✅ Pre-signed URL generated successfully");

//     return NextResponse.json({ 
//       uploadUrl, 
//       key,
//       success: true 
//     });

//   } catch (error: any) {
//     console.error("❌ Upload presign error:", error);
    
//     // Return detailed error information for debugging
//     return NextResponse.json(
//       { 
//         error: error.message,
//         details: error.stack,
//         type: error.name
//       },
//       { status: 500 }
//     );
//   }
// }

// File: client-app/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

// Initialize with sewas-app-user credentials (limited permissions)
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,  // sewas-app-user credentials
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileName, fileType, userId } = body;

    // Validate required fields
    if (!userId || !fileName || !fileType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Security: Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
      'application/pdf'
    ];
    
    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
    }

    // Security: Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.headers.get('content-length') && parseInt(req.headers.get('content-length')!) > maxSize) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    // Generate secure file path
    const ext = fileName.split(".").pop()?.toLowerCase() || "bin";
    const safeExt = ext.replace(/[^a-z0-9]/g, "");
    const uuid = crypto.randomUUID().slice(0, 8);
    const timestamp = Date.now();
    
    // Store documents in user-specific folder
    const key = `documents/${userId}/${timestamp}-${uuid}.${safeExt}`;

    console.log(`Generating upload URL for: ${key}`);

    // Create upload command (no public read permissions - only admin can access)
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
      Key: key,
      ContentType: fileType,
      Metadata: {
        'uploaded-by': 'sewas-app-user',
        'user-id': userId,
        'upload-timestamp': timestamp.toString(),
        'original-filename': fileName
      }
    });

    // Generate pre-signed URL for upload (1 hour expiry)
    const uploadUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 3600
    });

    return NextResponse.json({ 
      uploadUrl, 
      key,
      success: true,
      expiresIn: 3600
    });

  } catch (error: any) {
    console.error("Upload URL generation error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate upload URL",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}