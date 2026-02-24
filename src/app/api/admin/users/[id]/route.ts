// src/app/api/admin/users/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { hash } from "bcrypt";
import { authOptions } from "@/lib/auth";
import {prisma }from '@/lib/prisma';

// Helper to check admin access
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

// DELETE USER
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await checkAdmin();
    
    // Prevent deleting yourself
    if (session.user.id === params.id) {
        return NextResponse.json({ message: "You cannot delete your own account." }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized or Internal Error" }, { status: 500 });
  }
}

// UPDATE USER
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await checkAdmin();
    const body = await req.json();
    const { name, email, role, password } = body;

    const updateData: any = { name, email, role };

    // Only update password if a new one is provided
    if (password && password.length > 0) {
      updateData.password = await hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}