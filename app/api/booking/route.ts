// In app/api/booking/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Zod validation schema
const bookingSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  fatherName: z.string().min(3, { message: "Father's name is required." }),
  dateOfBirth: z.string().date(),
  gender: z.enum(["male", "female", "other"]),
  mobileNumber: z.string().regex(/^\d{10}$/),
  emailAddress: z.string().email(),
  permanentAddress: z.string().min(10),
  currentAddress: z.string().optional(),
  occupation: z.string().min(2),
  monthlyIncome: z.string().min(1),
  housingPreference: z.enum(["2bhk", "3bhk"]),
  preferredCity: z.string().min(2),
  legalAcknowledgment: z.boolean().refine(val => val === true),
  termsAgreement: z.boolean().refine(val => val === true),
  marketingConsent: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // --- DATABASE LOGIC ---
    // Map the camelCase data from the form to the snake_case columns in your database
    const { data, error } = await supabase
      .from('applications')
      .insert([{
        full_name: validatedData.fullName,
        father_name: validatedData.fatherName,
        date_of_birth: validatedData.dateOfBirth,
        gender: validatedData.gender,
        mobile_number: validatedData.mobileNumber,
        email_address: validatedData.emailAddress,
        permanent_address: validatedData.permanentAddress,
        current_address: validatedData.currentAddress,
        occupation: validatedData.occupation,
        monthly_income: validatedData.monthlyIncome,
        housing_preference: validatedData.housingPreference,
        preferred_city: validatedData.preferredCity,
        legal_acknowledgment: validatedData.legalAcknowledgment,
        terms_agreement: validatedData.termsAgreement,
        marketing_consent: validatedData.marketingConsent,
      }])
      .select();

    // Handle any potential database errors
    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Failed to save application to the database.");
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      data: data,
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: "Validation failed.",
        errors: error.flatten().fieldErrors,
      }, { status: 400 });
    }

    console.error("Server Error:", error);
    return NextResponse.json({
      success: false,
      message: (error as Error).message || "An unexpected error occurred.",
    }, { status: 500 });
  }
}