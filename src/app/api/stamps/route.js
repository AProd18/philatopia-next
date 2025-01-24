import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import prisma from "../../../lib/prisma";

// Function to move the image to the uploads folder
const saveImage = async (file) => {
  const uploadPath = path.join(process.cwd(), "public", "uploads", file.name);
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  // Writing the file to the uploads folder
  fs.writeFileSync(uploadPath, fileBuffer);

  return `/uploads/${file.name}`; // The path of the image that we store in the database
};

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const yearIssued = formData.get("yearIssued");
  const country = formData.get("country");
  const user = formData.get("user");
  const image = formData.get("image");

  if (!image) {
    return NextResponse.json({ success: false, error: "Image is required" });
  }

  try {
    // Checking the image size
    if (image.size > 1 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "Image is too large" });
    }

    // Checking the image dimensions using sharp
    const imgBuffer = Buffer.from(await image.arrayBuffer());
    const imageInfo = await sharp(imgBuffer).metadata();

    if (imageInfo.width > 1000 || imageInfo.height > 1000) {
      return NextResponse.json({
        success: false,
        error: "Image dimensions are too large",
      });
    }

    // Save the image to the uploads folder and get the path
    const imagePath = await saveImage(image);

    // Create a new stamp in the database with the image path
    const newStamp = await prisma.stamp.create({
      data: {
        name,
        description,
        yearIssued: parseInt(yearIssued),
        country,
        user,
        image: imagePath, // Path to the image in the database
      },
    });

    return NextResponse.json({ success: true, data: newStamp });
  } catch (error) {
    console.error("Error while adding a stamp:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
