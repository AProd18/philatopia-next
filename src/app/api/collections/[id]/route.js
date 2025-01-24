import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function DELETE(request, { params }) {
  const { id } = params; // Stamp ID from the URL

  try {
    await prisma.stamp.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({
      success: true,
      message: "Stamp deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete stamp",
      error,
    });
  }
}

export async function PUT(request, { params }) {
  // Updating access params
  const { id } = await params;

  const body = await request.json();

  try {
    const updatedStamp = await prisma.stamp.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        description: body.description,
        yearIssued: body.yearIssued,
        image: body.image || "", // Default value for image
        country: body.country,
      },
    });
    return NextResponse.json({ success: true, stamp: updatedStamp });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to update stamp",
      error,
    });
  }
}
