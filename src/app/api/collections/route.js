import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request) {
  const url = new URL(request.url);
  const user = url.searchParams.get("user");

  if (user) {
    // Query the database for stamps associated with the specified user
    const userStamps = await prisma.stamp.findMany({
      where: {
        user: user, // Filter by the "user" field
      },
      select: {
        id: true,
        name: true,
        description: true,
        yearIssued: true,
        image: true,
        createdAt: true,
      },
    });

    return NextResponse.json(userStamps); // Return the list of stamps as a JSON response
  }

  // If no "user" parameter is provided, return an empty array as a JSON response
  return NextResponse.json([]);
}
