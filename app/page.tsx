import Image from "next/image";
import BotonPanel from "./components/botonPanel";
import BuscarCodigoForm from "./components/buscarCodigoForm";

export default function Home() {
  return (
    <div>
      <div className="mt-6 flex justify-between items-center mx-10">
        <div className="text-4xl text-gray-600 font-extrabold">LOGO</div>
        <BotonPanel />
      </div>
      <div className="mt-10 mx-auto pt-10 py-5 px-7 min-w-fit w-1/3 shadow-2xl rounded-2xl outline outline-1 outline-gray-400 bg-white/90">
        <div className="text-center font-extrabold text-4xl text-gray-800">Facturación</div>
        <BuscarCodigoForm />
      </div>
    </div>
  );
}
