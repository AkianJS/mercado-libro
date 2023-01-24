import React from "react";
import styles from "../styles/SalesCard.module.css";

export default function SalesCard({ salesLast30Days }) {
  const salesQuantityArray = salesLast30Days.map((item) => item.ventas);
  const max = Math.max(...salesQuantityArray);
  return (
    <div className="my-4">
      <h1 className="text-xl text-center font-bold">
        Ventas de los últimos 30 días
      </h1>
      <div className="p-2 mt-4 min-w-[380px] h-72 flex gap-2 border-[2px] border-black rounded-md overflow-scroll">
        <div className="w-6 h-full flex justify-center text-center text-sm font-bold">
          <p className={` ${styles.verticalText} `}>Cantidad de ventas</p>
        </div>
        <div className="h-full flex flex-col">
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
                className="bg-emerald-500 w-4 border border-emerald-800"
              ></div>
            </div>
            <p
              title={item.fechaventas}
              className={`my-2 text-red-600 text-sm font-serif cursor-default rotate-12 -translate-x-2 ${styles.verticalText}`}
            >
              {item.fechaventas}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
