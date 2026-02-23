import { NextResponse } from "next/server";
import {prisma }from '@/lib/prisma';

// The existing GET function for fetching blog information
export async function GET(req: Request) {
  try {
    // 1. Get the URL parameters
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("latest") || searchParams.get("limit");

    // 2. Decide: Do we want ALL blogs or just a few?
    // If 'limit' exists in URL, use it. If not, use undefined (which means ALL).
    const takeAmount = limit ? parseInt(limit) : undefined;

    const blogs = await prisma.blog.findMany({
      take: takeAmount, // 👈 This is the magic line
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

// The new POST function for posting blog information
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      headline, blogUrl, category, content, authorName, 
      imageUrl, metaTitle, metaDescription, metaKeywords,
    } = body;

    const newBlog = await prisma.blog.create({
      data: 
      {
        headline,
        blogUrl,
        category,
        content,
        authorName,
        imageUrl,
        metaTitle,
        metaDescription,
        metaKeywords,
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

