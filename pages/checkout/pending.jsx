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
        className="bg-teal-600 text-white mt-4 ml-4 p-1 pl-2 pr-2 rounded-sm flex items-center gap-2 hover:scale-105 ease-linear duration-100"
      >
        Volver <FaAngleDoubleLeft />
      </button>
    </Layout>
  );
};

export default Pending;
