import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-Demand ISR Revalidation Endpoint
 * Call this to bust the cache for specific paths or tags.
 *
 * Usage:
 *   POST /api/revalidate
 *   Body: { "path": "/shop", "secret": "..." }
 *   or:   { "tag": "products", "secret": "..." }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const secret = body?.secret;

    // Verify revalidation secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: "Invalid revalidation secret" },
        { status: 401 }
      );
    }

    if (body.path) {
      revalidatePath(body.path, "page");
      return NextResponse.json({ revalidated: true, path: body.path });
    }

    if (body.tag) {
      revalidateTag(body.tag, "max");
      return NextResponse.json({ revalidated: true, tag: body.tag });
    }

    return NextResponse.json(
      { error: "Must provide 'path' or 'tag' to revalidate" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Revalidate] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
