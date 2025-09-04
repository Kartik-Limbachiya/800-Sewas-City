import { NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = uuidv4(); // generate UUID

    const createdAt = new Date().toISOString();

    // Insert record (documents empty for now)
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
          documents: { M: {} }, // empty now, will update later
          legalAcknowledgment: { BOOL: body.legalAcknowledgment },
          termsAgreement: { BOOL: body.termsAgreement },
          marketingConsent: { BOOL: body.marketingConsent },
        },
      })
    );

    return NextResponse.json({ success: true, id }); // ✅ send id back
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// Add this route for updating docs later
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    await client.send(
      new UpdateItemCommand({
        TableName: process.env.DYNAMODB_TABLE!,
        Key: { id: { S: params.id } },
        UpdateExpression: "SET documents = :docs",
        ExpressionAttributeValues: {
          ":docs": { S: JSON.stringify(body.documents) },
        },
      })
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
