import React from "react";
import Layout from "../../components/layout/Layout";
import AppContext from "../../context/AppContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useContext } from "react";
import UserInfo from "../../components/UserInfo";

const Profile = () => {
  const {
    state: { login },
  } = useContext(AppContext);

  return (
    <Layout title="MercadoLibro Perfil">
      <ProtectedRoute
        isLoading={login.isLoading}
        myBoolean={login.success}
        path="/login"
      >
        <section className="p-8">
          <UserInfo />
        </section>
      </ProtectedRoute>
    </Layout>
  );
};

export default Profile;
