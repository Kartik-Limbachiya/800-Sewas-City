// // CLIENT SIDE FILE: app/api/inquiry/route.ts
// // REPLACE THE ENTIRE FILE with this:

// import { NextResponse } from "next/server";
// import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
// import { v4 as uuidv4 } from "uuid";

// const client = new DynamoDBClient({ region: process.env.AWS_REGION });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const id = uuidv4(); // generate UUID
//     const createdAt = new Date().toISOString();

//     // Insert record (documents empty for now)
//     await client.send(
//       new PutItemCommand({
//         TableName: process.env.DYNAMODB_TABLE!,
//         Item: {
//           id: { S: id },
//           createdAt: { S: createdAt },
//           fullName: { S: body.fullName },
//           fatherName: { S: body.fatherName },
//           dateOfBirth: { S: body.dateOfBirth },
//           gender: { S: body.gender },
//           mobileNumber: { S: body.mobileNumber },
//           emailAddress: { S: body.emailAddress },
//           permanentAddress: { S: body.permanentAddress },
//           currentAddress: { S: body.currentAddress || "" },
//           occupation: { S: body.occupation },
//           monthlyIncome: { S: body.monthlyIncome },
//           housingPreference: { S: body.housingPreference },
//           preferredCity: { S: body.preferredCity },
//           documents: { M: {} }, // empty now, will update later
//           legalAcknowledgment: { BOOL: body.legalAcknowledgment },
//           termsAgreement: { BOOL: body.termsAgreement },
//           marketingConsent: { BOOL: body.marketingConsent },
//         },
//       })
//     );

//     // ✅ FIXED: Return both id and createdAt
//     return NextResponse.json({ success: true, id, createdAt });
//   } catch (error: any) {
//     console.error("❌ Inquiry creation error:", error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

// File: 800-Sewas-City/app/api/inquiry/route.ts

import { NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = uuidv4(); // generate UUID
    const createdAt = new Date().toISOString();

    await client.send(
      new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE!,
        Item: {
          id: { S: id },
          createdAt: { S: createdAt },
          fullName: { S: body.fullName },
          fatherName: { S: body.fatherName },
          dateOfBirth: { S: body.dateOfBirth },
          gender: { S: body.gender },
          mobileNumber: { S: body.mobileNumber },
          emailAddress: { S: body.emailAddress },
          permanentAddress: { S: body.permanentAddress },
          currentAddress: { S: body.currentAddress || "" },
          occupation: { S: body.occupation },
          monthlyIncome: { S: body.monthlyIncome },
          housingPreference: { S: body.housingPreference },
          preferredCity: { S: body.preferredCity },
          documents: { M: {} },
          legalAcknowledgment: { BOOL: body.legalAcknowledgment },
          termsAgreement: { BOOL: body.termsAgreement },
          marketingConsent: { BOOL: body.marketingConsent },
        },
      })
    );

    return NextResponse.json({ success: true, id, createdAt });
  } catch (error: any) {
    console.error("❌ Inquiry creation error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}