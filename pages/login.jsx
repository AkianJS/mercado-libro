import Login from "../components/Login";
import Layout from "../components/layout/Layout";
import RegisterForm from "../components/RegisterForm";

const LoginPage = () => {
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
