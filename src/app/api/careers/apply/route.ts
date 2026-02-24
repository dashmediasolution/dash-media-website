import { NextResponse } from 'next/server';
import { prisma }from '@/lib/prisma';

// POST: Submit a new application
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, fullName, email, mobileNumber, resumeUrl, coverLetter } = body;

    const application = await prisma.jobApplication.create({
      data: {
        jobId, // Assumes a valid MongoDB ObjectId string
        fullName,
        email,
        phone: mobileNumber,
        resumeUrl,
        coverLetter,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}