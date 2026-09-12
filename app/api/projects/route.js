import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

function isAdmin(request) {
  return request.cookies.get("olloberdi-admin-auth")?.value === "true";
}

export async function GET() {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { data, error } = await supabase.from("projects").insert({
    title: body.title,
    type: body.type,
    description: body.description,
    stack: body.stack,
    color: body.color,
    link: body.link || "",
    image: body.image || "",
  }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
