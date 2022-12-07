import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import AppContext from "../context/AppContext";
import ProtectedRoute from "../components/ProtectedRoute";
import CartBookCard from "../components/CartBookCard";
import styles from "../styles/BooksCartGrid.module.css"

const Cart = () => {
  const {
    state: { login },
  } = useContext(AppContext);
  return (
    <Layout title='MercadoLibro Carrito de Compras'>
      <ProtectedRoute path='/login' myBoolean={login.success} isLoading={login.isLoading}>
        <section className={`max-w-screen-xl p-8 ml-auto mr-auto flex flex-wrap ${styles.cartGrid}`}>
          {
          login?.usuario?.carrito?.map(item => 
          <CartBookCard key={item.libro.isbn} cartBook={item}/>)
          }
          
        </section>
      </ProtectedRoute>
    </Layout>
  );
};

export default Cart;
