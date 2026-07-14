import { NextResponse } from "next/server";
import { getMedication } from "@/lib/queries";

export async function GET(
  _request: Request,
  { params }: { params: { ndc: string } }
) {
  const medication = await getMedication(params.ndc);
  if (!medication) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ medication });
}
