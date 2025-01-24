import prisma from "../../../../lib/prisma";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1; // Default to page 1 if no page parameter is provided
    const pageSize = 8; // Number of stamps per page
    const skip = (page - 1) * pageSize; // Calculate the offset for pagination

    const stamps = await prisma.stamp.findMany({
      include: {
        collection: true, // Include the collection, if it exists
      },
      take: pageSize, // Limit the number of results to 6 per page
      skip, // Skip the appropriate number of results based on the current page
    });

    // Get the total number of stamps for pagination purposes
    const totalStamps = await prisma.stamp.count();

    return new Response(
      JSON.stringify({
        stamps,
        totalPages: Math.ceil(totalStamps / pageSize), // Calculate the total number of pages
        currentPage: page, // Current page
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching stamps:", error);
    return new Response("Failed to fetch stamps", { status: 500 });
  }
}
