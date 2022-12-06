import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import AppContext from "../context/AppContext";
import ProtectedRoute from "../components/ProtectedRoute";
import CartBookCard from "../components/CartBookCard";

const Cart = () => {
  const {
    state: { login },
  } = useContext(AppContext);
  return (
    <Layout title='MercadoLibro Carrito de Compras'>
      <ProtectedRoute path='/login' myBoolean={login.success} isLoading={login.isLoading}>
        <section className="max-w-screen-xl p-8 ml-auto mr-auto">
          {
          login?.usuario?.carrito?.map(item => 
          <CartBookCard key={item.isbn} cartBook={item}/>)
          }
          
        </section>
      </ProtectedRoute>
    </Layout>
  );
};

export default Cart;
