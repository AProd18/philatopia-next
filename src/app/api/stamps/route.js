import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const yearIssued = formData.get("yearIssued");
  const user = formData.get("user");
  const image = formData.get("image");

  try {
    // Create a new stamp record in the database without linking it to a collection
    const newStamp = await prisma.stamp.create({
      data: {
        name,
        description,
        yearIssued: parseInt(yearIssued),
        user,
        image, // Store the image name or URL
      },
    });

    return NextResponse.json({ success: true, data: newStamp });
  } catch (error) {
    console.error("Error while adding a stamp:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
