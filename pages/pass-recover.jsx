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
        <div className="min-w-[360px] max-w-lg p-4 m-auto flex flex-col gap-2">
          <label className="text-sm" htmlFor="pass-recover">
            Ingrese su email
          </label>
          <input
            ref={emailRef}
            className="bg-gray-200 p-1 rounded-md border-2 border-black outline-none"
            placeholder="Email"
            type="text"
            id="pass-recover"
          />
          <button className="w-2/4 m-auto p-1 bg-emerald-500 rounded-md">Enviar</button>
          {message && <p className="text-center">{message}</p>}
        </div>
      </form>
    </Layout>
  );
};

export default PassRecover;
