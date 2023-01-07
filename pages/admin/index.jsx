import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import AppContext from "../../context/AppContext";

const AdminPanel = () => {
  const {
    state: { login },
  } = useContext(AppContext);

  return (
    <Layout title="Panel del Administrador">
      <ProtectedRoute
        isLoading={login?.isLoading}
        myBoolean={login?.usuario?.admin}
        path="/"
      >
        <section className="max-w-screen-xl m-auto mt-4"></section>
      </ProtectedRoute>
    </Layout>
  );
};

export default AdminPanel;
