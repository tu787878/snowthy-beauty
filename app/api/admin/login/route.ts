import { NextResponse } from "next/server";
import { adminCookie, createSession, validLogin } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json() as { username?: string; password?: string };
  if (!(await validLogin(body.username ?? "", body.password ?? ""))) {
    return NextResponse.json({ error: "Benutzername oder Passwort ist falsch." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, await createSession(), {
    httpOnly: true,
    sameSite: "strict",
    secure: new URL(request.url).protocol === "https:",
    path: "/",
    maxAge: adminCookie.maxAge,
  });
  return response;
}
