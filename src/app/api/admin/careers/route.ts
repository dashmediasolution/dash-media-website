import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { prisma }from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Fetch Jobs
    const jobs = await prisma.jobPosting.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // 2. Fetch Applications (Include Job Title)
    const applications = await prisma.jobApplication.findMany({
      include: {
        job: {
          select: { title: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ jobs, applications });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admin data" }, { status: 500 });
  }
}