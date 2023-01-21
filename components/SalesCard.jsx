import React from "react";

export default function SalesCard({ salesLast30Days }) {
  return (
    <div className="w-52 h-24 mt-4 p-2 border-[2px] border-black rounded-md">
      <div className="flex flex-col justify-center items-start gap-4">
        <p>
          <strong>Fecha:</strong> {salesLast30Days?.fechaventas}
        </p>
        <p>
          <strong>Cantidad de ventas:</strong> {salesLast30Days?.ventas}
        </p>
      </div>
    </div>
  );
}
