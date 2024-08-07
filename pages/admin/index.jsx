import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import SalesCard from "../../components/SalesCard";
import AppContext from "../../context/AppContext";
import { getSellsStats } from "../../utils/getSellsStats";
import TotalSales from "../../components/TotalSales";
import Link from "next/link";
import SalesSearch from "../../components/SalesSearch";

const AdminPanel = ({ saleStats, error }) => {
  const {
    state: { login },
  } = useContext(AppContext);

  return (
    <Layout title="Panel del Administrador">
      <ProtectedRoute
        isLoading={login?.isLoading}
        myBoolean={login?.usuario?.admin}
        path="/"
      >
        <section className="max-w-screen-xl m-auto mt-4 p-4">
          {saleStats && (
            <div className="w-full">
              <button className="ml-auto block text-blue-500 duration-150 hover:scale-105">
                <Link href="/admin/coupons">Administrar cupones »»</Link>
              </button>

              <SalesSearch />

              <div className="flex flex-wrap justify-center">
                <SalesCard salesLast30Days={saleStats.ventasDia} />
                <TotalSales saleStats={saleStats} />
              </div>
            </div>
          )}
        </section>
      </ProtectedRoute>
    </Layout>
  );
};

export const getStaticProps = async () => {
  try {
    const data = await getSellsStats();
    if (data.errors || !data.data) {
      const error = "No se pudieron obtener los datos";
      const saleStats = null;
      return {
        props: {
          error,
          saleStats,
        },
      };
    } else if (data.data.getEstadisticas.success) {
      const error = null;
      const saleStats = data.data.getEstadisticas;
      return {
        props: {
          error,
          saleStats,
        },
        revalidate: 10,
      };
    } else {
      const error = "No se pudieron obtener los datos";
      const saleStats = null;
      return {
        props: {
          error,
          saleStats,
        },
      };
    }
  } catch (err) {
    const error = "No se pudieron obtener los datos";
    const saleStats = null;
    return {
      props: {
        error,
        saleStats,
      },
    };
  }
};

export default AdminPanel;
