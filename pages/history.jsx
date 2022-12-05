import React, { useContext, useEffect } from "react";
import Layout from "../components/layout/Layout";
import AppContext from "../context/AppContext";
import BooksGrid from "../components/BooksGrid";
import ProtectedRoute from "../components/ProtectedRoute";

const History = () => {
  const {
    state: { login },
  } = useContext(AppContext);

  return (
    <Layout>
      <ProtectedRoute myBoolean={login.success} path='/login'>
        <BooksGrid books={login?.usuario?.orden} texth3="Historial" />
        {!login?.usuario?.orden?.length && (
          <p className="text-2xl text-red-600 p-6">
            Usted aun no ha comprado ningún libro
          </p>
        )}
      </ProtectedRoute>
    </Layout>
  );
};

export default History;
