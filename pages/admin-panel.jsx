import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import AppContext from "../context/AppContext";

const AdminPanel = () => {
  const { state: { login }} = useContext(AppContext)
  console.log(login)
  return (
    <Layout title="Panel del Administrador">
      <ProtectedRoute isLoading={login?.isLoading} myBoolean={login?.usuario?.admin} path='/'>
        <div>AdminPanel</div>
      </ProtectedRoute>
    </Layout>
  );
};

export default AdminPanel;
