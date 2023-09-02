import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseClient = createClient(
  "https://kwyozmxtussiizjtcsui.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3eW96bXh0dXNzaWl6anRjc3VpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTUzMDcxOCwiZXhwIjoyMDA3MTA2NzE4fQ.-9FX20Lav6fp0WV0cbpMd2CstOG-7a8IyFpzgopcMeU",
  {
    db: {
      schema: "public",
    },
    auth: {
      autoRefreshToken: true,
      persistSession: false,
      detectSessionInUrl: true,
    },
  }
);

export async function GET(request: Request) {
  const res = await supabaseClient.from("recibos").select().order("id", { ascending: true });

  return NextResponse.json(res);
}
export async function POST(request: NextRequest) {
  const formulario = await request.json();

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");

  console.log(formulario);

  const { data, error } = await supabaseClient
    .from("recibos")
    .insert({ id: formulario.numRecibo, fecha: formulario.fecha, total: formulario.total })
    .select();

  if (error) {
    console.error(error);
  }

  //   const res = await fetch("https://data.mongodb-api.com/...", {
  //     method: "POST",
  //     headers: requestHeaders,
  //     body: formulario,
  //   });

  //   const data = await res.json();

  return NextResponse.json({ ok: "ok" });
}
