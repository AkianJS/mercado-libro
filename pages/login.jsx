import Login from "../components/Login";
import Layout from "../components/layout/Layout";
import RegisterForm from "../components/RegisterForm";
import { useContext, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import AppContext from "../context/AppContext";

const LoginPage = () => {
  const userState = useContext(AppContext);
  const {
    state: { login },
  } = userState;

  const [isInLogin, setIsInLogin] = useState(false);
  return (
    <Layout>
      <ProtectedRoute
        isLoading={login.isLoading}
        myBoolean={!login?.success}
        path="/"
      >
        <div
          className={`bg-black w-2/4 min-h-[110%] absolute top-16 z-20 hidden md:flex md:items-start md:flex-col overflow-hidden transition-all duration-500 right-0 ${
            isInLogin ? "" : "-translate-x-full"
          }`}
        >
          <p className="text-white relative z-20 p-4 mt-[50%] transition-all ml-auto mr-auto">
            {isInLogin
              ? "Si aun no tienes una cuenta regístrate, es gratis!"
              : "Si ya tienes una cuenta inicia sesión"}
          </p>
          <button
            onClick={() => setIsInLogin(!isInLogin)}
            className="text-black relative z-20 bg-white p-2 rounded-sm mt-2 m-auto hover:transition-all transition-all"
          >
            {isInLogin ? "Regístrate" : "Inicia Sesión"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 transition-all">
          <Login />
          <RegisterForm />
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default LoginPage;
