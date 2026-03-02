import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import Layout from "../../components/layout/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import TotalAmountCart from "../../components/TotalAmountCart";
import UserInfo from "../../components/UserInfo";
import AppContext from "../../context/AppContext";
import { startPayment } from "../../utils/startPayment";

const Payment = () => {
  const {
    state: { login },
    updateUserInfo,
  } = useContext(AppContext);
  const { usuario } = login;

  const cartHasSomething = useMemo(() => {
    return login?.usuario?.carrito?.items?.length > 0 ? true : false;
  }, [login?.usuario?.carrito]);

  const router = useRouter();

  const handleOnClick = async () => {
    if (
      !usuario?.nombre ||
      !usuario?.direccion?.direccion ||
      !usuario?.direccion?.ciudad?.cp
    )
      return alert("Faltan datos de envío");
    const res = await startPayment({ token: login?.accessToken });
    const { errors, data } = res;
    if (errors || !data)
      return alert("Fallo en la operación, intente más tarde");
    data.realizarCompra?.success
      ? router.push(data.realizarCompra?.init_point)
      : alert("Error al enviar a mercado pago");
  };

  return (
    <Layout>
      <ProtectedRoute
        myBoolean={cartHasSomething}
        path={"/cart"}
        isLoading={login.isLoading}
      >
        <div className="max-w-7xl m-auto mt-4 flex justify-center">
          <div>
            <h1 className="text-slate-800 dark:text-slate-100">
              Para ver una guía de como pagar en mercado pago sandbox, dirígete
              a:{" "}
            </h1>
            <a href="https://github.com/AkianJS/mercado-libro/blob/main/README.md">
              <p className="text-indigo-500 dark:text-indigo-400 cursor-pointer hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                https://github.com/AkianJS/mercado-libro/blob/main/README.md
              </p>
            </a>
            <br />
            <h2 className="text-lg text-slate-800 dark:text-slate-100">
              Si tu dirección es correcta has click en <i>pagar</i>!
            </h2>
            <br />
            <Link href="/checkout">
              <p className="float-right inline-block text-sm relative text-indigo-600 dark:text-indigo-400 after:h-[1px] after:w-0 after:bg-indigo-600 dark:after:bg-indigo-400 after:content-[' '] after:absolute after:left-0 after:bottom-0 hover:after:w-full after:duration-200 font-medium">
                EDITAR INFO
              </p>
            </Link>
          </div>
        </div>
        <UserInfo />
        <TotalAmountCart
          updateUserInfo={updateUserInfo}
          login={login}
          finalButtonText="Pagar"
          cartHasSomething={cartHasSomething}
          handleOnClick={handleOnClick}
        />
      </ProtectedRoute>
    </Layout>
  );
};

export default Payment;
