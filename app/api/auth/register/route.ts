import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, phone } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // In a production app, we MUST hash the password using a library like bcrypt
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password, // Reminder: Hash this in real production!
        phone,
        wallet: {
          create: {
            balance: 0.0,
            currency: "NGN",
          },
        },
      },
    });

    return NextResponse.json({ message: "User created successfully", userId: user.id }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
