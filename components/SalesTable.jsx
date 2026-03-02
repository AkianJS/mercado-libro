import { useRouter } from "next/router";
import React from "react";

export default function SalesTable({ orders }) {
    const router = useRouter()

  const handleGoToDetails = (item) => {
    router.push(`/admin/sales-details/?date=${item.fecha}&offset=0`)
  }

  return (
    <div className="py-4 overflow-auto">
      <table className="table-fixed text-center border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg overflow-hidden">
        <thead className="bg-slate-100 dark:bg-slate-700">
          <tr className="text-slate-800 dark:text-slate-200">
            <th className="px-4 py-3 border border-slate-200 dark:border-slate-600 font-semibold">Fecha</th>
            <th className="px-4 py-3 border border-slate-200 dark:border-slate-600 font-semibold">Cupón</th>
            <th className="px-4 py-3 border border-slate-200 dark:border-slate-600 font-semibold">Descuento</th>
            <th className="px-4 py-3 border border-slate-200 dark:border-slate-600 font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr
              className={index % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-slate-50 dark:bg-slate-700/50"}
              key={item.id}
            >
              <td onClick={() => handleGoToDetails(item)} className="px-4 py-3 border border-slate-200 dark:border-slate-700 cursor-pointer text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">{item.fecha}</td>
              <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                {item.cupon ? item.cupon.codigo_cupon : "-"}
              </td>
              <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                {item.cupon ? item.cupon.porc_descuento + " %" : "-"}
              </td>
              <td className="px-4 py-3 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-medium">
                {item.total} $
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
