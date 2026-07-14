import { NextResponse } from "next/server";
import { getRestrictions } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const restrictions = await getRestrictions();
  return NextResponse.json({ restrictions });
}
