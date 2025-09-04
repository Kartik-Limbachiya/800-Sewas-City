import { NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const item = {
      id: { S: crypto.randomUUID() },
      createdAt: { S: new Date().toISOString() },
      fullName: { S: data.fullName },
      fatherName: { S: data.fatherName },
      dateOfBirth: { S: data.dateOfBirth },
      gender: { S: data.gender },
      mobileNumber: { S: data.mobileNumber },
      emailAddress: { S: data.emailAddress },
      permanentAddress: { S: data.permanentAddress },
      currentAddress: { S: data.currentAddress || "" },
      occupation: { S: data.occupation },
      monthlyIncome: { S: data.monthlyIncome },
      housingPreference: { S: data.housingPreference },
      preferredCity: { S: data.preferredCity },
      documents: { S: JSON.stringify(data.documents) },
      legalAcknowledgment: { BOOL: data.legalAcknowledgment },
      termsAgreement: { BOOL: data.termsAgreement },
      marketingConsent: { BOOL: data.marketingConsent },
    };

    await dynamo.send(
      new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE!,
        Item: item,
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DynamoDB save error:", error);
    return NextResponse.json({ success: false, message: "DB save failed" }, { status: 500 });
  }
}
