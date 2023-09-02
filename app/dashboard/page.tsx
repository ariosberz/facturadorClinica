"use client";

import { useEffect, useState } from "react";
import AgregarModal from "./components/agregarModal";
import Table, { Recibo } from "./components/table";
import Toolbar from "./components/toolbar";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = () => {
  const [mostrarAgregarModal, setMostrarAgregarModal] = useState(false);

  const { data, error, isLoading } = useSWR("../api/recibos", fetcher);

  if (!data) {
    return <></>;
  }
  const recibos = data.data;
  return (
    <>
      <AgregarModal mostrarAgregarModal={mostrarAgregarModal} setMostrarAgregarModal={setMostrarAgregarModal} />
      <div className="flex max-w-6xl justify-center mx-auto my-10">
        <div className="min-w-fit w-10/12 ">
          <Toolbar setMostrarAgregarModal={setMostrarAgregarModal} />
          <Table recibos={recibos} />
        </div>
      </div>
    </>
  );
};

export default Page;
