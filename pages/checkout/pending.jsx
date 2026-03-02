import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import Layout from "../../components/layout/Layout";

const Pending = () => {
  useEffect(() => {
    Swal.fire({
      title: "Algo pasó",
      text: "Su pago no se pudo completar y quedará en pendiente",
      icon: "warning",
      confirmButtonText: "Continuar",
    });
  }, []);

  const router = useRouter();

  const handleOnClick = () => {
    router.push("/");
  };
  return (
    <Layout>
      <button
        onClick={handleOnClick}
        className="bg-indigo-500 hover:bg-indigo-600 text-white mt-6 ml-6 py-2 px-4 rounded-lg flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm"
      >
        Volver <FaAngleDoubleLeft />
      </button>
    </Layout>
  );
};

export default Pending;
