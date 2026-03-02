import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <title>{title || "MercadoLibro"}</title>
        <meta
          name="description"
          content="Pagina principal con todos los libros"
        />
      </Head>
      <Navbar />
      <div className="body-layout overflow-hidden bg-[#F8F7F4] dark:bg-slate-900 transition-colors duration-300">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
