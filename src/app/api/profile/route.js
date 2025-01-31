import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        profileImage: true,
        aboutMe: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const aboutMe = formData.get("aboutMe");
  const image = formData.get("image");
  const userEmail = session.user.email;

  try {
    let imagePath = null;

    // Fetch the current user from the database
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    // If the user uploads a new image, delete the old one and save the new one
    if (image) {
      const uploadDir = path.join(process.cwd(), "public", "profile_images");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Delete the old image if it exists
      if (user.profileImage) {
        const oldImagePath = path.join(
          process.cwd(),
          "public",
          user.profileImage
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Save the new image
      const filePath = path.join(uploadDir, image.name);
      const fileBuffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(filePath, fileBuffer);

      imagePath = `/profile_images/${image.name}`;
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: {
        aboutMe,
        ...(imagePath && { profileImage: imagePath }),
      },
    });

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
