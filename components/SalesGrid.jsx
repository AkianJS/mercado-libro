import React from "react";

export default function SalesGrid({ orders }) {
  return (
    <div className="border border-black m-4">
      {orders.orden_detalle.map((item) => (
        <div className="grid md:grid-cols-2 border border-black px-4 py-2" key={item.id}>
            <div className="px-2">
                <p>Isbn: {item.libro.isbn}</p>
                <p>Título: {item.libro.titulo}</p>
            </div>
            <div className="px-2">
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio por unidad: {item.precio}</p>
            </div>
        </div>
      ))}
    </div>
  );
}
