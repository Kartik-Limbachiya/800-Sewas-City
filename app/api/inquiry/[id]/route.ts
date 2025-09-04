import { NextResponse } from "next/server";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

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
