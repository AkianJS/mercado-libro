import React, { useContext, useState } from "react";
import Layout from "../../components/layout/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import AppContext from "../../context/AppContext";
import { getThemes } from "../../utils/getThemes";
import AdminAddBook from "../../components/AdminAddBook";
import { FaPlus } from "react-icons/fa";
import AdminAddCoupon from "../../components/AdminAddCoupon";
import AdminAddTheme from "../../components/AdminAddTheme";
import AdminVentas from "../../components/AdminVentas";
import { getSells } from "../../utils/getSells";
import AdminUpdateTheme from "../../components/AdminUpdateTheme";
import AdminRemoveTheme from "../../components/AdminRemoveTheme";
import AdminDeleteBook from "../../components/AdminDeleteBook";

const AdminPanel = ({ getTemas, getVentas }) => {
  const {
    state: { login },
  } = useContext(AppContext);

  const [showAddBook, setShowAddBook] = useState(false);
  const [showRemoveBook, setShowRemoveBook] = useState(false);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showUpdateCategory, setShowUpdateCategory] = useState(false);
  const [showRemoveTheme, setShowRemoveTheme] = useState(false);

  return (
    <Layout title="Panel del Administrador">
      <ProtectedRoute
        isLoading={login?.isLoading}
        myBoolean={login?.usuario?.admin}
        path="/"
      >
        <section className="max-w-screen-xl m-auto mt-4">
          {/* Agregar libro */}
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

          {/* Eliminar libro */}
          <button
            onClick={() => setShowRemoveBook(!showRemoveBook)}
            className="flex gap-2 items-center ml-6 hover:scale-110 duration-300"
          >
            Eliminar libro
            <FaPlus
              className={`duration-200 ${showRemoveBook ? "rotate-45" : ""}`}
            />
          </button>

          <div
            className={`duration-300 ease-in scroll-smooth ${
              showRemoveBook
                ? "max-h-152 overflow-scroll"
                : "overflow-hidden max-h-0"
            }`}
          >
            <AdminDeleteBook />
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
          <br />
          <button
            onClick={() => setShowUpdateCategory(!showUpdateCategory)}
            className="flex gap-2 items-center ml-6 hover:scale-110 duration-300"
          >
            Modificar categoría
            <FaPlus
              className={`duration-200 ${
                showUpdateCategory ? "rotate-45" : ""
              }`}
            />
          </button>
          <div
            className={`duration-300 ease-in scroll-smooth ${
              showUpdateCategory
                ? "max-h-152 overflow-scroll"
                : "overflow-hidden max-h-0"
            }`}
          >
            <br />
            <AdminUpdateTheme />
            <br />
          </div>
          <br />
          {/* Eliminar categoría */}
          <button
            onClick={() => setShowRemoveTheme(!showRemoveTheme)}
            className="flex gap-2 items-center ml-6 hover:scale-110 duration-300"
          >
            Eliminar categoría
            <FaPlus
              className={`duration-200 ${showRemoveTheme ? "rotate-45" : ""}`}
            />
          </button>

          <div
            className={`duration-300 ease-in scroll-smooth ${
              showRemoveTheme
                ? "max-h-152 overflow-scroll"
                : "overflow-hidden max-h-0"
            }`}
          >
            <br />
            <AdminRemoveTheme themes={getTemas} />
            <br />
          </div>

          {/* Ventas */}
          <div>
            <AdminVentas getVentas={getVentas} />
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

  const res2 = await getSells();
  const {
    data: { getVentas },
  } = res2;

  return {
    props: {
      getTemas,
      getVentas,
    },
    revalidate: 10,
  };
}

export default AdminPanel;