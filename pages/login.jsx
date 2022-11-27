import Login from "../components/Login";
import Layout from "../components/layout/Layout";
import RegisterForm from "../components/RegisterForm";
import { useContext } from "react";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

const LoginPage = () => {
  const userState = useContext(AppContext);
  const { state } = userState;
  const router = useRouter();
  state.logged && router.push("/");

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Login />
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
