import { NextResponse } from "next/server";
import { searchEntities } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const entities = await searchEntities(q);
  return NextResponse.json({ entities });
}
