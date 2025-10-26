import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    if (!(redis && slug)) {
      return NextResponse.json({ count: 0 });
    }

    const count = await redis.incr(`pageviews:${slug}`);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
