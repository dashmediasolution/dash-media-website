import { NextResponse } from "next/server";
import {prisma }from '@/lib/prisma';

// GET function to fetch all consultation requests
export async function GET() {
  try {
    const requests = await prisma.consultationRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch requests" }, { status: 500 });
  }
}

// POST function to create a new consultation request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, mobileNumber, requirements, websiteUrl, service } = body;

    const newRequest = await prisma.consultationRequest.create({
      data: {
        name,
        email,
        mobileNumber,
        requirements,
        websiteUrl,
        service, 
      },
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create request" }, { status: 500 });
  }
}