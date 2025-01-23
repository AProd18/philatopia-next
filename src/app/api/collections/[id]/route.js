import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function DELETE(request, { params }) {
  const { id } = params; // ID markice iz URL-a

  try {
    await prisma.stamp.delete({
      where: { id: parseInt(id) }, // Konvertujemo id u broj
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
  // Ažuriramo pristup params
  const { id } = await params; // Dodali smo await

  const body = await request.json(); // Podaci za ažuriranje

  try {
    const updatedStamp = await prisma.stamp.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        description: body.description,
        yearIssued: body.yearIssued,
        image: body.image || "", // Dodali default vrednost za image
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
