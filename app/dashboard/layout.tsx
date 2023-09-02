import { Metadata } from "next";
import BotonCerrarSesionSupa from "../auth/botonCerrarSesion";

export const metadata: Metadata = {
  title: "Dashboard Recibos",
  description: "Dashboard Recibos",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mt-6 flex justify-between items-center mx-10">
        <div className="text-4xl text-gray-300 font-extrabold">LOGO</div>
        <BotonCerrarSesionSupa />
      </div>
      {children}
    </div>
  );
}
