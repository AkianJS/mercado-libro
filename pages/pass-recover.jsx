import React, { useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import { setPassRecovery } from "../utils/setPassRecovery";

const PassRecover = () => {
  const [message, setMessage] = useState(null);
  const emailRef = useRef(null);

  const handlePassRecovery = async (e) => {
    e.preventDefault()
    let email = emailRef.current.value;
    const res = await setPassRecovery({ email: email });
    const { data, errors } = res;

    if (errors || !data) {
      setMessage("Error en el servidor, intente más tarde");

      return setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else if (data.recuperarContrasenia.success) {
      setMessage("Éxito! se envió la nueva contraseña a su correo");

      return setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else if (!data.recuperarContrasenia.success) {
      setMessage("El correo no existe");

      return setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <Layout>
      <form onSubmit={handlePassRecovery}>
        <div className="min-w-[360px] max-w-lg p-6 m-auto flex flex-col gap-3 mt-8">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="pass-recover">
            Ingrese su email
          </label>
          <input
            ref={emailRef}
            className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg border border-slate-300 dark:border-slate-600 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            placeholder="Email"
            type="text"
            id="pass-recover"
          />
          <button className="w-2/4 m-auto py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium text-sm transition-colors">Enviar</button>
          {message && <p className="text-center text-sm text-slate-600 dark:text-slate-400">{message}</p>}
        </div>
      </form>
    </Layout>
  );
};

export default PassRecover;
