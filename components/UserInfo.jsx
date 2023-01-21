import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Button from "./ui/Button";

const UserInfo = () => {
  const {
    state: { login },
  } = useContext(AppContext);
  const { usuario } = login;

  return (
    <section className="max-w-7xl m-auto mt-2">
      {login.usuario?.admin && (
        <div className="flex flex-col justify-center items-center gap-4">
          <h4 className="text-xl font-bold">
            Cuenta de <span className="text-blue-800"> administración</span>
          </h4>
          <div>
            <Button>Cambiar contraseña</Button>
          </div>
        </div>
      )}
      {!login.usuario?.admin && (
        <div className="mr-8 ml-8 max-[380px]:mr-2 max-[380px]:ml-2 inline-flex flex-col items-center justify-center">
          <div className="w-full flex gap-2">
            <p className="font-bold">Nombre:</p>
            <span>{usuario?.nombre}</span>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-bold">DNI:</p>
            <span>{usuario?.direccion?.dni}</span>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-bold">Dirección:</p>
            <span>{usuario?.direccion?.direccion}</span>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-bold">Teléfono:</p>
            <span>{usuario?.direccion?.telefono}</span>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-bold">Código Postal:</p>
            <span>{usuario?.direccion?.ciudad?.cp}</span>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-bold">Info Adicional:</p>
            <span>{usuario?.direccion?.infoAdicional}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserInfo;
