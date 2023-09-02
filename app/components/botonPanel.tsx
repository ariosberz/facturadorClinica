"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const BotonPanel = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const abrirDashboard = async () => {
    router.refresh();
    router.push("/dashboard");
  };

  return (
    <button
      onClick={abrirDashboard}
      className=" bg-blue-100 hover:bg-blue-200 active:bg-blue-300 font-semibold rounded-lg h-8 w-28 text-sm shadow-lg outline outline-1 outline-blue-300"
    >
      Panel
    </button>
  );
};

export default BotonPanel;
