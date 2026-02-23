import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma }from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      user: { email: newUser.email },
      message: "User created successfully",
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}