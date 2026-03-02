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
          className={`bg-indigo-600 dark:bg-indigo-700 w-2/4 min-h-[110%] absolute top-16 z-20 hidden md:flex md:items-start md:flex-col overflow-hidden transition-all duration-500 right-0 ${
            isInLogin ? "" : "-translate-x-full"
          }`}
        >
          <p className="text-white relative z-20 p-4 mt-[40vh] transition-all ml-auto mr-auto text-center">
            {isInLogin
              ? "Si aun no tienes una cuenta regístrate, es gratis!"
              : "Si ya tienes una cuenta inicia sesión"}
          </p>
          <button
            onClick={() => setIsInLogin(!isInLogin)}
            className="text-indigo-700 dark:text-indigo-800 relative z-20 bg-white py-2 px-4 rounded-lg mt-2 m-auto hover:shadow-lg transition-all font-medium"
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
