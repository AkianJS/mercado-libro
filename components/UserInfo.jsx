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
          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Cuenta de <span className="text-indigo-600 dark:text-indigo-400"> administración</span>
          </h4>
          <div>
            <Button>Cambiar contraseña</Button>
          </div>
        </div>
      )}
      {!login.usuario?.admin && (
        <div className="mr-8 ml-8 max-[380px]:mr-2 max-[380px]:ml-2 inline-flex flex-col items-center justify-center bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors" style={{boxShadow: 'var(--card-shadow)'}}>
          <div className="w-full flex gap-2">
            <p className="font-semibold text-slate-800 dark:text-slate-100">Nombre:</p>
            <span className="text-slate-600 dark:text-slate-300">{usuario?.nombre}</span>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-semibold text-slate-800 dark:text-slate-100">DNI:</p>
            <span className="text-slate-600 dark:text-slate-300">{usuario?.direccion?.dni}</span>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-semibold text-slate-800 dark:text-slate-100">Dirección:</p>
            <span className="text-slate-600 dark:text-slate-300">{usuario?.direccion?.direccion}</span>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-semibold text-slate-800 dark:text-slate-100">Teléfono:</p>
            <span className="text-slate-600 dark:text-slate-300">{usuario?.direccion?.telefono}</span>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-semibold text-slate-800 dark:text-slate-100">Código Postal:</p>
            <span className="text-slate-600 dark:text-slate-300">{usuario?.direccion?.ciudad?.cp}</span>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-semibold text-slate-800 dark:text-slate-100">Info Adicional:</p>
            <span className="text-slate-600 dark:text-slate-300">{usuario?.direccion?.infoAdicional}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserInfo;
