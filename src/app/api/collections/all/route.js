import prisma from "../../../../lib/prisma";

export async function GET(request) {
  try {
    const stamps = await prisma.stamp.findMany({
      include: {
        collection: true, // Uključujemo kolekciju, ako postoji
      },
    });

    return new Response(JSON.stringify(stamps), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching stamps:", error);
    return new Response("Failed to fetch stamps", { status: 500 });
  }
}
