import { NextResponse } from "next/server";
import { getEntity } from "@/lib/queries";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const entity = await getEntity(params.id);
  if (!entity) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ entity });
}
