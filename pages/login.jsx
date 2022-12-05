import Login from "../components/Login";
import Layout from "../components/layout/Layout";
import RegisterForm from "../components/RegisterForm";
import { useContext } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import AppContext from "../context/AppContext";

const LoginPage = () => {
  const userState = useContext(AppContext);
  const { state: { login } } = userState;

  return (
    <Layout>
      <ProtectedRoute isLoading={login.isLoading} myBoolean={!login?.success} path='/'>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Login />
          <RegisterForm />
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default LoginPage;
