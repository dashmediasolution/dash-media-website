import { NextResponse } from "next/server";
import {prisma }from '@/lib/prisma';

// Function to handle PUT requests for updating a blog
export async function PUT(request: Request, { params }: { params: { blogId: string } }) {
  try {
    const { blogId } = params;
    const body = await request.json();
    
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: body, // Pass the whole body from the form to update all fields
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

// Function to handle DELETE requests for deleting a blog
export async function DELETE(request: Request, { params }: { params: { blogId: string } }) {
    try {
        const { blogId } = params;

        await prisma.blog.delete({
            where: { id: blogId },
        });

        return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting blog post:", error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}