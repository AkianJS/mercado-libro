import React from "react";

export default function SalesGrid({ orders }) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 m-4 rounded-lg overflow-hidden bg-white dark:bg-slate-800 transition-colors" style={{boxShadow: 'var(--card-shadow)'}}>
      {orders.orden_detalle.map((item) => (
        <div className="grid md:grid-cols-2 border-b border-slate-200 dark:border-slate-700 last:border-0 px-4 py-3" key={item.id}>
            <div className="px-2">
                <p className="text-slate-700 dark:text-slate-300"><span className="font-medium text-slate-800 dark:text-slate-200">Isbn:</span> {item.libro.isbn}</p>
                <p className="text-slate-700 dark:text-slate-300"><span className="font-medium text-slate-800 dark:text-slate-200">Título:</span> {item.libro.titulo}</p>
            </div>
            <div className="px-2">
                <p className="text-slate-700 dark:text-slate-300"><span className="font-medium text-slate-800 dark:text-slate-200">Cantidad:</span> {item.cantidad}</p>
                <p className="text-slate-700 dark:text-slate-300"><span className="font-medium text-slate-800 dark:text-slate-200">Precio por unidad:</span> {item.precio}</p>
            </div>
        </div>
      ))}
    </div>
  );
}
