import React from "react";

export default function TotalSales({ saleStats }) {
  return (
    <div className="my-4">
      <h1 className="text-xl text-center font-bold text-slate-800 dark:text-slate-100">Ventas por mes</h1>
      <div className="mx-4 mt-4 text-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 transition-colors" style={{boxShadow: 'var(--card-shadow)'}}>
        <table className="w-64 table-auto">
          <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Mes</th>
              <th className="px-4 py-3 font-semibold">Total de ventas</th>
            </tr>
          </thead>
          <tbody>
            {saleStats?.ventasMes?.map((item, index) => (
              <tr
                className={`px-4 py-3 border-b border-slate-100 dark:border-slate-700 ${
                  index % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-slate-50 dark:bg-slate-700/50"
                }`}
                key={item.fechaventas}
              >
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{item.fechaventas}</td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{item.ventas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
