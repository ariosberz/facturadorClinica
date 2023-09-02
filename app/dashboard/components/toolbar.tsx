"use client";

import { Dispatch, SetStateAction } from "react";

export default function Toolbar({ setMostrarAgregarModal }: { setMostrarAgregarModal: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div className="flex justify-end">
      <button
        onClick={() => {
          setMostrarAgregarModal(true);
        }}
        className=" bg-green-100 hover:bg-green-200 active:bg-green-300 font-semibold mb-5 rounded-lg h-10 w-36 text-sm shadow-lg outline outline-1 outline-green-700"
      >
        Agregar Recibo
      </button>
    </div>
  );
}
