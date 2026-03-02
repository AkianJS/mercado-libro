import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { FaAngleDoubleLeft } from "react-icons/fa";

const Success = () => {
  useEffect(() => {
    Swal.fire({
      title: "Éxito!",
      text: "Su compra se ha realizado satisfactoriamente!",
      icon: "success",
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

export default Success;
