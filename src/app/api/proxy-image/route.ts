import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  
  if (!url) {
    return new Response("Missing URL parameter", { status: 400 });
  }

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Response(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/*",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error: unknown) {
    console.error(error);
    return new Response("Failed to fetch image", { status: 500 });
  }
} 