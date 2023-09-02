"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const BotonCerrarSesionSupa = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  return (
    <button
      onClick={cerrarSesion}
      className=" bg-red-100 hover:bg-red-200 active:bg-red-300 font-semibold rounded-lg h-8 w-28 text-sm shadow-lg outline outline-1 outline-red-300"
    >
      Cerrar sesión
    </button>
  );
};

export default BotonCerrarSesionSupa;
