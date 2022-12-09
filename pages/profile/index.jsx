import React from "react";
import Layout from "../../components/layout/Layout";
import AppContext from "../../context/AppContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import styles from "../../styles/Profile.module.css";
import { useContext } from "react";

const Profile = () => {
  const {
    state: { login },
  } = useContext(AppContext);

  return (
    <Layout title="MercadoLibro Perfil">
      <ProtectedRoute
        isLoading={login.isLoading}
        myBoolean={login?.success}
        path="/login"
      >
        <section className="p-8">
          <div className={`relative w-full h-64 ${styles.banner}`}>
            <h2 className="mt-4 text-4xl font-bold text-right absolute right-4 -bottom-4">
              Mi Perfil
            </h2>
          </div>

          <p>Nombre Completo: {login.usuario?.nombre}</p>
          
        </section>
      </ProtectedRoute>
    </Layout>
  );
};

export default Profile;
