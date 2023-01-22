import React from "react";

export default function TotalSales({ saleStats }) {
  return (
    <div className="my-4">
      <h1 className="text-xl text-center font-bold">Ventas por mes</h1>
      <div className="mx-4 mt-4 text-center border-black border rounded-md">
        <table className="w-64 table-auto ">
          <thead className="bg-gray-400 text-gray-800 text=xl border-b border-black">
            <tr>
              <th className="px-4 py-3">Mes</th>
              <th className="px-4 py-3">Total de ventas</th>
            </tr>
          </thead>
          <tbody>
            {saleStats?.ventasMes?.map((item, index) => (
              <tr
                className={`px-4 py-3 border-b border-black ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-400"
                }`}
                key={item.fechaventas}
              >
                <td className={`px-4 py-3`}>{item.fechaventas}</td>
                <td className="px-4 py-3">{item.ventas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
