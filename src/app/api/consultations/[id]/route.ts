import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isRead } = body;

    const updatedRequest = await prisma.consultationRequest.update({
      where: { id },
      data: { isRead },
    });

    return NextResponse.json(updatedRequest, { status: 200 });
  } catch (error) {
    console.error("[CONSULTATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.consultationRequest.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[CONSULTATION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}