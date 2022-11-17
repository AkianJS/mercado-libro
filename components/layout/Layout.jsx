import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "MercadoLibro"}</title>
        <meta
          name="description"
          content="Página principal con todos los libros"
        />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
