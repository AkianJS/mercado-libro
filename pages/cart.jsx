import React, { useContext, useMemo } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import AppContext from "../context/AppContext";
import ProtectedRoute from "../components/ProtectedRoute";
import CartBookCard from "../components/CartBookCard";
import styles from "../styles/BooksCartGrid.module.css";
import TotalAmountCart from "../components/TotalAmountCart";

const Cart = () => {
  const {
    state: { login },
    updateUserInfo,
  } = useContext(AppContext);

  const router = useRouter();

  const cartHasSomething = useMemo(() => {
    return login?.usuario?.carrito?.items?.length > 0 ? true : false;
  }, [login?.usuario?.carrito]);

  const handleOnClick = () => {
    router.push("/checkout");
  };

  return (
    <Layout title="MercadoLibro Carrito de Compras">
      <ProtectedRoute
        path="/login"
        myBoolean={login.success}
        isLoading={login.isLoading}
      >
        <section
          className={`max-w-screen-xl p-6 ml-auto mr-auto flex flex-wrap ${styles.cartGrid}`}
        >
          {login?.usuario?.carrito?.items?.map((item) => (
            <CartBookCard
              key={item.libro.isbn}
              token={login.accessToken}
              cartBook={item}
              updateUserInfo={updateUserInfo}
            />
          ))}
          {!cartHasSomething && (
            <p className="w-full text-red-600 text-xl">
              Aun no has agregado nada a tu carrito!
            </p>
          )}
        </section>
        <TotalAmountCart
        updateUserInfo={updateUserInfo}
          cartHasSomething={cartHasSomething}
          handleOnClick={handleOnClick}
          finalButtonText="Continuar Compra"
          login={login}
        />
      </ProtectedRoute>
    </Layout>
  );
};

export default Cart;
