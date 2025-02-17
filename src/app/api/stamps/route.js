import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import path from "path";
import sharp from "sharp";
import prisma from "../../../lib/prisma";

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const yearIssued = formData.get("yearIssued");
  const country = formData.get("country");
  const userId = formData.get("userId");
  const image = formData.get("image");

  if (!image) {
    return NextResponse.json({ success: false, error: "Image is required" });
  }

  try {
    const imgBuffer = Buffer.from(await image.arrayBuffer());

    // Upload to Supabase Storage
    const filePath = `stamps/${Date.now()}_${image.name}`;
    const { data, error } = await supabase.storage
      .from("stamp_images") // Bucket name
      .upload(filePath, imgBuffer, {
        contentType: image.type,
      });

    if (error) throw error;

    // Get public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("stamp_images")
      .getPublicUrl(filePath);

    // Save stamp details to the database
    const newStamp = await prisma.stamp.create({
      data: {
        name,
        description,
        yearIssued: parseInt(yearIssued),
        country,
        userId,
        image: publicUrlData.publicUrl, // Store public URL in the database
      },
    });

    return NextResponse.json({ success: true, data: newStamp });
  } catch (error) {
    console.error("Error while adding a stamp:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
