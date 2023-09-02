"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

const BuscarCodigoForm = () => {
  const schemaBuscarCodigo = z.object({
    codigoFacturacion: z.number({ required_error: "Cód. de facturación necesario.", invalid_type_error: "El código es inválido" }).min(1),
  });
  type SchemaBuscarCodigo = z.infer<typeof schemaBuscarCodigo>;
  const errorForm = (mensaje: string) => {
    return <div className="-mt-3 mb-5 text-red-500 text-sm">{mensaje}</div>;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchemaBuscarCodigo>({ resolver: zodResolver(schemaBuscarCodigo), shouldUnregister: true });

  const [recibo, setRecibo] = useState<any>();

  const submit = async (data: SchemaBuscarCodigo) => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    const res = await fetch("../../api/codigofacturacion", {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(data),
    });
    const response = await res.json();
    setRecibo(response[0]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="mt-10 flex flex-col justify-center items-center">
        <div className="w-full flex justify-center">
          <div className="mr-3 font-bold">Código de facturación</div>
          <input {...register("codigoFacturacion", { valueAsNumber: true })} className="border border-gray-400" />
        </div>
        <button
          type="submit"
          id="ok-btn"
          className="mt-7 w-40 py-2 bg-green-200 outline outline-1 outline-green-700 text-green-950 text-base font-medium rounded-md  shadow-sm hover:bg-green-300 active:bg-green-500"
        >
          Buscar recibo
        </button>
      </form>
      {recibo && (
        <div className="mt-5">
          <div>Número de recibo: {recibo.id}</div>
          <div>Fecha: {recibo.fecha}</div>
          <div>Total: ${recibo.total}</div>
        </div>
      )}
    </>
  );
};

export default BuscarCodigoForm;
