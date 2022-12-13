import React, { useContext, useState } from "react";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import AppContext from "../context/AppContext";
import { getThemes } from "../utils/getThemes";
import AdminAddBook from "../components/AdminAddBook";
import { FaPlus } from "react-icons/fa";
import AdminAddCoupon from "../components/AdminAddCoupon";
import AdminAddTheme from "../components/AdminAddTheme";

const AdminPanel = ({ getTemas }) => {
  const {
    state: { login },
  } = useContext(AppContext);

  const [showAddBook, setShowAddBook] = useState(false);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  return (
    <Layout title="Panel del Administrador">
      <ProtectedRoute
        isLoading={login?.isLoading}
        myBoolean={login?.usuario?.admin}
        path="/"
      >
        <section className="max-w-screen-xl m-auto mt-4">
          <button
            onClick={() => setShowAddBook(!showAddBook)}
            className="flex gap-2 items-center ml-6 hover:scale-110 duration-300"
          >
            Agregar libro{" "}
            <FaPlus
              className={`duration-200 ${showAddBook ? "rotate-45" : ""}`}
            />
          </button>

          <div
            className={`duration-300 ease-in scroll-smooth ${
              showAddBook
                ? "max-h-152 overflow-scroll"
                : "overflow-hidden max-h-0"
            }`}
          >
            <AdminAddBook login={login} getTemas={getTemas} />
          </div>
          <br />

          <button
            onClick={() => setShowAddCoupon(!showAddCoupon)}
            className="flex gap-2 items-center ml-6 hover:scale-110 duration-300"
          >
            Agregar Cupón{" "}
            <FaPlus
              className={`duration-200 ${showAddCoupon ? "rotate-45" : ""}`}
            />
          </button>
          <div
            className={`duration-300 ease-in scroll-smooth ${
              showAddCoupon
                ? "max-h-152 overflow-scroll"
                : "overflow-hidden max-h-0"
            }`}
          >
            <br />
            <AdminAddCoupon />
          </div>
            <br />
          <button
            onClick={() => setShowAddCategory(!showAddCategory)}
            className="flex gap-2 items-center ml-6 hover:scale-110 duration-300"
          >
            Agregar Categoría{" "}
            <FaPlus
              className={`duration-200 ${showAddCategory ? "rotate-45" : ""}`}
            />
          </button>
          {/* Agregar categoría */}
          <div
            className={`duration-300 ease-in scroll-smooth ${
              showAddCategory
                ? "max-h-152 overflow-scroll"
                : "overflow-hidden max-h-0"
            }`}
          >
            <br />
            <AdminAddTheme />
            <br />
          </div>
        </section>
      </ProtectedRoute>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await getThemes();
  const {
    data: { getTemas },
  } = res;

  return {
    props: {
      getTemas,
    },
  };
}

export default AdminPanel;
