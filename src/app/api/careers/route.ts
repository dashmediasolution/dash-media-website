import { NextResponse } from 'next/server';
import { prisma }from '@/lib/prisma';

// GET: Fetch all active jobs (Public)
export async function GET() {
  try {
    const jobs = await prisma.jobPosting.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST: Create a new job (Admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, department, location, type, description } = body;

    const newJob = await prisma.jobPosting.create({
      data: {
        title,
        department,
        location,
        type,
        description,
        isActive: true,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}