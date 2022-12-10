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
  } = useContext(AppContext);
  const { usuario } = login;
  const cartHasSomething = useMemo(() => {
    return login?.usuario?.carrito?.length > 0 ? true : false;
  }, [login?.usuario?.carrito]);

  const router = useRouter()

  const handleOnClick = async() => {
    if (!usuario?.nombre || !usuario?.direccion?.direccion || !usuario?.direccion?.ciudad?.cp)
      return alert("Faltan datos de envío");
    const res = await startPayment({ token: login?.accessToken });
    const {errors, data} = res
    if (errors || !data) return alert('Fallo en la operación, intente más tarde')
    data.realizarCompra.success ? router.push(data.realizarCompra.init_point) : alert('Error al enviar a mercado pago')
  };

  return (
    <Layout>
      <ProtectedRoute
        myBoolean={cartHasSomething}
        path={"/cart"}
        isLoading={login.isLoading}
      >
        <UserInfo />
        <TotalAmountCart
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
