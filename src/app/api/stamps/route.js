import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase";
import prisma from "../../../lib/prisma";
import sharp from "sharp";

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
    // Convert image to buffer and process it with sharp
    const imgBuffer = Buffer.from(await image.arrayBuffer());

    // Resize and convert to WebP using sharp
    const processedImage = await sharp(imgBuffer)
      .resize({ width: 1000, height: 1000, fit: sharp.fit.inside }) // Limit dimensions to 1000x1000
      .webp({ quality: 80 }) // Convert to WebP with 80% quality
      .toBuffer();

    // Upload to Supabase Storage using the Service Role Key
    const filePath = `stamps/${Date.now()}_${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}.webp`;
    const { data, error } = await supabaseAdmin.storage
      .from(process.env.SUPABASE_BUCKET_STAMP_IMAGES)
      .upload(filePath, processedImage, {
        contentType: "image/webp",
      });

    if (error) throw error;

    // Get public URL of the uploaded image
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(process.env.SUPABASE_BUCKET_STAMP_IMAGES)
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
