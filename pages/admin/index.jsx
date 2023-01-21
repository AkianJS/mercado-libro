import React, { useContext, useState } from "react";
import Layout from "../../components/layout/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import SalesCard from "../../components/SalesCard";
import AppContext from "../../context/AppContext";
import { getSellsStats } from "../../utils/getSellsStats";
import styles from "../../styles/Admin.module.css"

const AdminPanel = ({ saleStats, error }) => {
  const {
    state: { login },
  } = useContext(AppContext);

  console.log(saleStats);

  return (
    <Layout title="Panel del Administrador">
      <ProtectedRoute
        isLoading={login?.isLoading}
        myBoolean={login?.usuario?.admin}
        path="/"
      >
        <section className="max-w-screen-xl m-auto mt-4 p-4">
          {saleStats && (
            <div>
              <h1 className="text-xl font-bold">
                Ventas de los últimos 30 días
              </h1>
              <div className={styles.grid}>
                {saleStats.ventasDia.map((item) => (
                  <SalesCard key={item.fechaVentas} salesLast30Days={item} />
                ))}
              </div>
            </div>
          )}
        </section>
      </ProtectedRoute>
    </Layout>
  );
};

export async function getStaticProps() {
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
}

export default AdminPanel;
