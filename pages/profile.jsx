import React from "react";
import Layout from "../components/layout/Layout";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const Profile = () => {
  const {
    state: { login },
  } = useContext(AppContext);

  return (
    <Layout title="MercadoLibro Perfil">
      <ProtectedRoute isLoading={login.isLoading} myBoolean={login?.success} path='/login'>
        <div>Profile</div>
      </ProtectedRoute>
    </Layout>
  );
};

export default Profile;
