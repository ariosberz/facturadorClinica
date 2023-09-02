"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";

const schemaAgregarForm = z.object({
  numRecibo: z
    .number({ required_error: "Núm. de recibo necesario", invalid_type_error: "El número de recibo debe ser un número." })
    .int({ message: "El número de recibo debe ser entero." })
    .positive({ message: "El número de recibo debe ser positivo." }),
  fecha: z.date({ required_error: "Fecha requerida.", invalid_type_error: "Fecha incorrecta." }),
  total: z
    .number({ required_error: "Total Sin IVA necesario", invalid_type_error: "El Total Sin IVA debe ser un número." })
    .positive({ message: "El Total Sin IVA debe ser positivo." }),
});

type SchemaAgregarForm = z.infer<typeof schemaAgregarForm>;

const errorForm = (mensaje: string) => {
  return <div className="-mt-3 mb-5 text-red-500 text-sm">{mensaje}</div>;
};

export default function AgregarModal({
  mostrarAgregarModal,
  setMostrarAgregarModal,
}: {
  mostrarAgregarModal: boolean;
  setMostrarAgregarModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [resetForm, setResetForm] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchemaAgregarForm>({ resolver: zodResolver(schemaAgregarForm), shouldUnregister: true });

  const cerrarAgregarModal = () => {
    setResetForm(true);
    setMostrarAgregarModal(false);
  };

  const enviarFormulario = async (data: SchemaAgregarForm) => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    const res = await fetch("../../api/recibos", {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(data),
    });
    const response = await res.json();
    actualizarTabla();
  };

  const actualizarTabla = async () => {
    await mutate("../api/recibos");
  };

  const onSubmit: SubmitHandler<SchemaAgregarForm> = (data) => {
    enviarFormulario(data);
    cerrarAgregarModal();
  };

  useEffect(() => {
    if (resetForm) {
      reset(undefined, {
        keepValues: false,
        keepIsSubmitted: false,
      });
      setResetForm(false);
    }
  }, [resetForm, reset]);

  if (!mostrarAgregarModal) {
    return null;
  }

  return (
    <div id="agregarModal" className="h-full absolute top-0">
      <div className=" fixed z-[1] bg h-full w-full bg-black bg-opacity-25 backdrop-blur-sm" />
      <div className=" fixed  z-[2] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 border w-[26rem] shadow-lg rounded-3xl bg-white">
        <div className="my-7 text-center">
          <h3 className="text-2xl  font-medium text-gray-900">AGREGAR RECIBO</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="pt-7 px-7 text-left" noValidate>
            <div className="flex items-center justify-between mb-5">
              <label htmlFor="numRecibo" className="text-sm font-medium text-gray-900 dark:text-white">
                Número de recibo
              </label>
              <input
                type="number"
                id="numRecibo"
                {...register("numRecibo", { valueAsNumber: true })}
                className="w-[13rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ejemplo: 55"
                required
              />
            </div>
            {errors.numRecibo?.message && errorForm(errors.numRecibo?.message)}
            <div className="flex items-center justify-between mb-5">
              <label htmlFor="fecha" className="text-sm font-medium text-gray-900 dark:text-white">
                Fecha
              </label>
              <input
                type="date"
                id="fecha"
                {...register("fecha", { valueAsDate: true })}
                className="w-[13rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            {errors.fecha?.message && errorForm(errors.fecha?.message)}
            <div className="flex gap-3 items-center justify-between mb-5">
              <label htmlFor="totalSinIVA" className="text-sm font-medium text-gray-900 dark:text-white">
                Total Sin IVA $
              </label>
              <input
                type="number"
                id="totalSinIVA"
                {...register("total", { valueAsNumber: true })}
                className="w-[13rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ejemplo: 4567.33"
                required
              />
            </div>
            {errors.total?.message && errorForm(errors.total?.message)}
            <div className="flex justify-around mt-8">
              <button
                onClick={() => {
                  cerrarAgregarModal();
                }}
                id="ok-btn"
                className="w-40 py-2 bg-gray-100 outline outline-1 outline-gray-400  text-gray-600 text-base font-medium rounded-md  shadow-sm hover:bg-gray-300 active:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                id="ok-btn"
                className="w-40 py-2 bg-green-200 outline outline-1 outline-green-700 text-green-950 text-base font-medium rounded-md  shadow-sm hover:bg-green-300 active:bg-green-500"
              >
                Agregar recibo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
