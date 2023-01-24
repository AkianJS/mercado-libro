import { useRouter } from "next/router";
import React from "react";

export default function SalesTable({ orders }) {
    const router = useRouter()

  const handleGoToDetails = (item) => {
    router.push(`/admin/sales-details/?date=${item.fecha}&offset=0`)
  }

  return (
    <div className="py-4">
      <table className="table-fixed text-center border border-black text-slate-800">
        <thead className="bg-gray-400">
          <tr className="text-black">
            <th className="px-4 py-2 border border-black">Fecha</th>
            <th className="px-4 py-2 border border-black">Cupón</th>
            <th className="px-4 py-2 border border-black">Descuento</th>
            <th className="px-4 py-2 border border-black">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr
              className={index % 2 === 0 ? "bg-white" : "bg-gray-400"}
              key={item.id}
            >
              <td onClick={() => handleGoToDetails(item)} className="px-4 py-2 border border-black cursor-pointer text-blue-600">{item.fecha}</td>
              <td className="px-4 py-2 border border-black">
                {item.cupon ? item.cupon.codigo_cupon : "-"}
              </td>
              <td className="px-4 py-2 border border-black">
                {item.cupon ? item.cupon.porc_descuento + " %" : "-"}
              </td>
              <td className="px-4 py-2 border border-black text-green-700 cursor-pointer">
                {item.total} $
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
