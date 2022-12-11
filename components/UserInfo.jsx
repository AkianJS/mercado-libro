import Link from "next/link";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";

const UserInfo = () => {
  const {
    state: { login },
  } = useContext(AppContext);
  const { usuario } = login;

  return (
    <section className="max-w-7xl m-auto mt-2">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex justify-start gap-2">
            <p className="font-bold">Nombre:</p>
            <span>{usuario?.nombre}</span>
          </div>
          <div className="flex justify-start gap-2">
            <p className="font-bold">DNI:</p>
            <span>{usuario?.direccion?.dni}</span>
          </div>
          <div className="flex justify-start gap-2">
            <p className="font-bold">Dirección:</p>
            <span>{usuario?.direccion?.direccion}</span>
          </div>
          <div className="flex justify-start gap-2">
            <p className="font-bold">Teléfono:</p>
            <span>{usuario?.direccion?.telefono}</span>
          </div>
          <div className="flex justify-start gap-2">
            <p className="font-bold">Cópdigo Postal:</p>
            <span>{usuario?.direccion?.ciudad?.cp}</span>
          </div>
          <div className="flex justify-start gap-2">
            <p className="font-bold">Info Adicional:</p>
            <span>{usuario?.direccion?.infoAdicional}</span>
          </div>
        </div>
    </section>
  );
};

export default UserInfo;
