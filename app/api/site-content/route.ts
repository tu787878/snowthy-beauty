import { NextResponse } from "next/server";
import { readSiteContent, writeSiteContent } from "@/lib/content-store";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await readSiteContent(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Content storage is unavailable." }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await writeSiteContent(await request.json()));
  } catch {
    return NextResponse.json({ error: "Saving failed." }, { status: 500 });
  }
}
