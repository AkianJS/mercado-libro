import Link from "next/link";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";

const UserInfo = () => {
  const {
    state: { login },
  } = useContext(AppContext);
  const { usuario } = login;

  return (
    <section className="max-w-7xl m-auto mt-4">
      <div className="w-full flex items-center flex-col">
        <div>
          <h2 className="text-lg">
            Si tu dirección es correcta has click en <i>pagar</i>!
          </h2>
          <br />
          <Link href="/checkout">
            <p className="float-right text-sm inline-block relative after:h-[1px] after:w-0 after:bg-black after:content-[' '] after:absolute after:left-0 after:bottom-0 hover:after:w-full after:duration-100">
              EDITAR INFO
            </p>
            <br />
          </Link>
        </div>
        <div className="flex justify-center gap-2">
          <p className="font-bold">Nombre:</p>
          <span>{usuario?.nombre}</span>
        </div>
        <div className="flex justify-center gap-2">
          <p className="font-bold">DNI:</p>
          <span>{usuario?.direccion?.dni}</span>
        </div>
        <div className="flex justify-center gap-2">
          <p className="font-bold">Dirección:</p>
          <span>{usuario?.direccion?.direccion}</span>
        </div>
        <div className="flex justify-center gap-2">
          <p className="font-bold">Teléfono:</p>
          <span>{usuario?.direccion?.telefono}</span>
        </div>
        <div className="flex justify-center gap-2">
          <p className="font-bold">Cópdigo Postal:</p>
          <span>{usuario?.direccion?.ciudad?.cp}</span>
        </div>
        <div className="flex justify-center gap-2">
          <p className="font-bold">Info Adicional:</p>
          <span>{usuario?.direccion.infoAdicional}</span>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
