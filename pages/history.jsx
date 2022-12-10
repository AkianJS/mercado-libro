import React, { useContext, useEffect } from "react";
import Layout from "../components/layout/Layout";
import AppContext from "../context/AppContext";
import ProtectedRoute from "../components/ProtectedRoute";
import HistoryBooksGrid from "../components/HistoryBooksGrid";

const History = () => {
  const {
    state: { login },
  } = useContext(AppContext);
  return (
    <Layout>
      <ProtectedRoute
        myBoolean={login?.success}
        isLoading={login?.isLoading}
        path="/login"
      >
        <section className="max-w-screen-xl m-auto">
          <h3 className="mt-4 mb-12 ml-6 uppercase bold text-4xl">Historial</h3>
          {login?.usuario?.orden?.map((item) => (
            <HistoryBooksGrid key={item.id} order={item} />
          ))}

          {!login?.usuario?.orden?.length && (
            <p className="text-2xl text-red-600 p-6">
              Usted aun no ha comprado ningún libro
            </p>
          )}
        </section>
      </ProtectedRoute>
    </Layout>
  );
};

export default History;
