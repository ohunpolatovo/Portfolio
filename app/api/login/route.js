import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Login konfiguratsiyasi topilmadi." }, { status: 500 });
  }

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Email yoki parol noto'g'ri." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("olloberdi-admin-auth", "true", {
    httpOnly: true,
    maxAge: 86400,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}