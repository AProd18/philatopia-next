import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    // Validate that all required fields are provided
    if (!email || !name || !password) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    // Check if a user with the provided email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    // Check if a user with the same name already exists
    const existingName = await prisma.user.findUnique({
      where: { name },
    });

    if (existingName) {
      return new Response(JSON.stringify({ message: "Name already taken" }), {
        status: 400,
      });
    }

    // Hash the user's password using bcrypt with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database with the provided details
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword, // Hashed password for secure storage
      },
    });

    // Return a success response with the newly created user's data
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/register:", error);

    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
