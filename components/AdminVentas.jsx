import React from "react";

const AdminVentas = ({ getVentas }) => {
  return (
    <div className="m-4">
      <h2 className="text-xl font-bold">Ventas</h2>
      {getVentas?.orden?.map((item) => (
        <div className="mt-4 mb-4" key={item.id}>
          <h4 className="mb-1 font-bold text-emerald-600">
            Fecha de la orden: {item.fecha}
          </h4>
          <div className=" p-2 rounded-md border-2 border-black">
            {item?.orden_detalle?.map((detail) => (
              <div className="flex" key={detail.id}>
                <p>
                  <strong> Titulo: </strong> {detail?.libro?.titulo}
                </p>
                <p className="ml-auto mr-4">
                  <strong>ISBN:</strong> {detail.libro.isbn}
                </p>
                <p className="">
                  <strong> Stock: </strong> {detail?.libro?.stock}
                </p>
                <hr />
              </div>
            ))}
            <p><strong> Total: </strong> {item.total} $</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminVentas;
