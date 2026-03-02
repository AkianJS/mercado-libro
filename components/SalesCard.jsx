import React from "react";
import styles from "../styles/SalesCard.module.css";

export default function SalesCard({ salesLast30Days }) {
  const salesQuantityArray = salesLast30Days.map((item) => item.ventas);
  const max = salesQuantityArray.length ? Math.max(...salesQuantityArray) : 0;
  return (
    <div className="my-4">
      <h1 className="text-xl text-center font-bold text-slate-800 dark:text-slate-100">
        Ventas de los últimos 30 días
      </h1>
      <div className="p-2 mt-4 min-w-[380px] h-72 flex gap-2 border border-slate-200 dark:border-slate-700 rounded-xl overflow-scroll bg-white dark:bg-slate-800 transition-colors" style={{boxShadow: 'var(--card-shadow)'}}>
        <div className="w-6 h-full flex justify-center text-center text-sm font-bold text-slate-500 dark:text-slate-400">
          <p className={` ${styles.verticalText} `}>Cantidad de ventas</p>
        </div>
        <div className="h-full flex flex-col text-slate-500 dark:text-slate-400 text-sm">
          <p>-{max}</p>
          <p className="mt-32">-0</p>
        </div>
        {salesLast30Days.map((item) => (
          <div
            className="h-full pt-2 flex flex-col justify-end"
            key={item.fechaventas}
          >
            <div className="h-44 flex items-end">
              <div
                title={`${item.ventas}`}
                style={{ height: `${(item.ventas / max) * 100}%` }}
                className="bg-indigo-500 dark:bg-indigo-400 w-4 border border-indigo-600 dark:border-indigo-500 rounded-t"
              ></div>
            </div>
            <p
              title={item.fechaventas}
              className={`my-2 text-indigo-600 dark:text-indigo-400 text-xs font-serif cursor-default rotate-12 -translate-x-2 ${styles.verticalText}`}
            >
              {item.fechaventas}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
