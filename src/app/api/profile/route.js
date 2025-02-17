import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabaseAdmin } from "../../../lib/supabase";
import sharp from "sharp";

// Handle GET request to fetch user profile details
export async function GET(request) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Fetch user profile data from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { profileImage: true, aboutMe: true },
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

// Handle POST request to update user profile (profile image & aboutMe)
export async function POST(request) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
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
    let imageUrl = null;
    let oldImagePath = null;

    // Find the old image from the database before the update
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { profileImage: true },
    });

    if (existingUser?.profileImage) {
      const parts = existingUser.profileImage.split("/");
      oldImagePath = parts.slice(-2).join("/"); // Get the path to the old image
    }

    // If a new profile image is provided, upload it to Supabase storage
    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${userEmail}-${Date.now()}.${fileExt}`;
      const filePath = `profile_images/${fileName}`;

      // Convert the image to WebP format and reduce its size to max 300x300px
      const buffer = await image.arrayBuffer();
      const optimizedImage = await sharp(Buffer.from(buffer))
        .resize(300, 300, { fit: "cover" }) // Change image size
        .toFormat("webp") // Convert to WeBP format
        .toBuffer();

      const { data, error } = await supabaseAdmin.storage
        .from(process.env.SUPABASE_BUCKET_PROFILE_IMAGES)
        .upload(filePath, optimizedImage, { contentType: "image/webp" });

      if (error) {
        console.error("Error uploading to Supabase:", error);
        return NextResponse.json(
          { success: false, error: "Image upload failed" },
          { status: 500 }
        );
      }

      // Retrieve the public URL of the uploaded image
      const { data: publicUrlData } = supabaseAdmin.storage
        .from(process.env.SUPABASE_BUCKET_PROFILE_IMAGES)
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;

      // Delete old image from SUpabase Storage (if exist)
      if (oldImagePath) {
        await supabaseAdmin.storage
          .from(process.env.SUPABASE_BUCKET_PROFILE_IMAGES)
          .remove([oldImagePath]);
      }
    }

    // Update user profile in the database (aboutMe & profile image if available)
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: { aboutMe, ...(imageUrl && { profileImage: imageUrl }) },
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
