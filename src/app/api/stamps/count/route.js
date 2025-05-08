import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ success: false, error: "Missing user ID" });
  }

  try {
    const count = await prisma.stamp.count({
      where: { userId },
    });

    return NextResponse.json({ success: true, count });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
