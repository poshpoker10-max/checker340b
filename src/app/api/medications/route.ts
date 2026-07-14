import { NextResponse } from "next/server";
import { searchMedications } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const medications = await searchMedications(q);
  return NextResponse.json({ medications });
}
