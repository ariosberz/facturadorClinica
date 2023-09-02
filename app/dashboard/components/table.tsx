"use client";

export interface Recibo {
  id: number;
  fecha: string;
  facturado: string;
  codigoFacturacion: string;
  total: number;
}

export default function Table({ recibos }: { recibos: Recibo[] }) {
  const reciboList = recibos.map((recibo) => {
    return (
      <tr key={recibo.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {recibo.id}
        </th>
        <td className="px-6 py-4">{recibo.fecha}</td>
        <td className="px-6 py-4">{recibo.facturado}</td>
        <td className="px-6 py-4">${recibo.total}</td>
        <td className="px-6 py-4">{recibo.codigoFacturacion}</td>
        <td className="px-6 py-4">
          {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Editar
          </a> */}
          Editar
        </td>
      </tr>
    );
  });

  return (
    <div className="relative overflow-x-auto shadow-2xl rounded-2xl outline outline-1 outline-gray-400">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Facturado
            </th>
            <th scope="col" className="px-6 py-3">
              Total Sin IVA $
            </th>
            <th scope="col" className="px-6 py-3">
              Cód. Facturación
            </th>
            <th scope="col" className="px-6 py-3">
              Edición
            </th>
          </tr>
        </thead>
        <tbody>{reciboList}</tbody>
      </table>
    </div>
  );
}
