// // CLIENT SIDE FILE: app/api/inquiry/[id]/route.ts
// // REPLACE THE ENTIRE FILE with this:

// import { NextResponse } from "next/server";
// import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

// const client = new DynamoDBClient({ region: process.env.AWS_REGION });

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const body = await req.json();
//     const { documents, createdAt } = body;

//     if (!createdAt) {
//       return NextResponse.json({ 
//         success: false, 
//         message: "createdAt is required for document update" 
//       }, { status: 400 });
//     }

//     console.log("📝 CLIENT: Updating documents for user:", params.id);
//     console.log("📅 CLIENT: CreatedAt:", createdAt);
//     console.log("📋 CLIENT: Documents to save:", documents);

//     // ✅ FIXED: Build document attributes for DynamoDB Map
//     const documentAttributes: Record<string, any> = {};
    
//     if (documents && typeof documents === 'object') {
//       Object.entries(documents).forEach(([key, url]) => {
//         if (url && typeof url === 'string') {
//           documentAttributes[key] = { S: url };
//         }
//       });
//     }

//     const updateCommand = new UpdateItemCommand({
//       TableName: process.env.DYNAMODB_TABLE!,
//       Key: { 
//         id: { S: params.id },
//         createdAt: { S: createdAt }  // ✅ FIXED: Include sort key
//       },
//       UpdateExpression: "SET documents = :docs",
//       ExpressionAttributeValues: {
//         ":docs": { M: documentAttributes },
//       },
//     });

//     await client.send(updateCommand);

//     console.log("✅ CLIENT: Documents updated successfully in DynamoDB");
//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error("❌ CLIENT: Document update error:", error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

// File: 800-Sewas-City/app/api/inquiry/[id]/route.ts

import { NextResponse } from "next/server";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { documents, createdAt } = body;

    if (!createdAt) {
      return NextResponse.json(
        { success: false, message: "createdAt is required for document update" },
        { status: 400 }
      );
    }

    const documentAttributes: Record<string, any> = {};
    if (documents && typeof documents === 'object') {
      Object.entries(documents).forEach(([key, url]) => {
        if (url && typeof url === 'string') {
          documentAttributes[key] = { S: url };
        }
      });
    }

    const updateCommand = new UpdateItemCommand({
      TableName: process.env.DYNAMODB_TABLE!,
      Key: {
        id: { S: params.id },
        createdAt: { S: createdAt }
      },
      UpdateExpression: "SET documents = :docs",
      ExpressionAttributeValues: {
        ":docs": { M: documentAttributes },
      },
    });

    await client.send(updateCommand);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ CLIENT: Document update error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}