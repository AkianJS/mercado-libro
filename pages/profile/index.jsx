import React from "react";
import Layout from "../../components/layout/Layout";
import AppContext from "../../context/AppContext";
import ProtectedRoute from "../../components/ProtectedRoute";
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
          <div className={``}>
            
          </div>

          <p>Nombre Completo: {login.usuario?.nombre}</p>
          <p>Correo: {login.usuario?.correo}</p>
          
        </section>
      </ProtectedRoute>
    </Layout>
  );
};

export default Profile;
