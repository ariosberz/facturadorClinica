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

export async function POST(request: NextRequest) {
  const reqJSON = await request.json();

  const { data, error } = await supabaseClient
    .from("recibos")
    .select()
    .eq("codigoFacturacion", <number>reqJSON["codigoFacturacion"]);

  if (error) {
    console.error(error);
  }

  return NextResponse.json(data);
}
