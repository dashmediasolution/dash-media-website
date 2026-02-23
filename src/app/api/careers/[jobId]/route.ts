import { NextResponse } from 'next/server';
import {prisma }from '@/lib/prisma';

type Props = {
  params: Promise<{ jobId: string }>
}

// --- DELETE JOB ---
export async function DELETE(req: Request, { params }: Props) {
  try {
    const { jobId } = await params;

    // ✅ FIX: Use a Transaction to delete applications FIRST, then the job
    await prisma.$transaction(async (tx) => {
      // 1. Delete all applications associated with this job
      await tx.jobApplication.deleteMany({
        where: { jobId: jobId }
      });

      // 2. Now it is safe to delete the job itself
      await tx.jobPosting.delete({
        where: { id: jobId },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}

// --- UPDATE JOB ---
export async function PUT(req: Request, { params }: Props) {
  try {
    const { jobId } = await params;
    
    const body = await req.json(); 
    
    const { title, department, location, type, description } = body;

    const updatedJob = await prisma.jobPosting.update({
      where: { id: jobId },
      data: {
        title,
        department,
        location,
        type,
        description,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}