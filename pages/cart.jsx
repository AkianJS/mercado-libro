import React, { useContext, useMemo } from "react";
import Layout from "../components/layout/Layout";
import AppContext from "../context/AppContext";
import ProtectedRoute from "../components/ProtectedRoute";
import CartBookCard from "../components/CartBookCard";
import styles from "../styles/BooksCartGrid.module.css";
import { FaCaretRight } from "react-icons/fa";

const Cart = () => {
  const {
    state: { login },
    updateUserInfo,
  } = useContext(AppContext);

  const cartHasSomething = useMemo(() => {
    return login?.usuario?.carrito?.length > 0 ? true : false;
  }, [login?.usuario?.carrito]);

  const total = useMemo(() => {
    if (login?.usuario?.carrito?.length > 1) {
      return login?.usuario?.carrito.reduce(
        (prev, current) => prev + current.libro?.precio * current.cantidad,
        0
      );
    } else return login.usuario?.carrito[0]?.cantidad * login.usuario?.carrito[0]?.libro?.precio
  }, [login?.usuario?.carrito]);
  console.log(login)
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
          {login?.usuario?.carrito?.map((item) => (
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
        <div className="max-w-3xl ml-auto mr-auto p-6">
          <hr className="border-t-2 mr-8 ml-8 " />
          {cartHasSomething && (
            <div className="w-3/4  p-4 m-auto flex flex-col justify-center items-center mt-4 border-gray-600 border-2">
              <div className="flex justify-center items-center w-full">
                <h4 className="text-xl font-bold">Total: </h4>
                <p className="ml-auto font-bold">{total} $</p>
              </div>
              <div className="mt-4 flex flex-wrap justify-center items-center w-full bg-gray-400 p-2 pl-1 pr-1">
                <FaCaretRight />
                <input
                  className="bg-gray-400 border-b-2 border-black placeholder:opacity-70 placeholder:text-black outline-none w-[30vw] max-w-sm"
                  placeholder="Cupón de descuento"
                  type="text"
                />
                <button className="bg-black text-white ml-4 p-1 pl-2 pr-2 rounded-sm">
                  Agregar
                </button>
              </div>
            </div>
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default Cart;
