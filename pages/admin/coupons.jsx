import { useRouter } from "next/router";
import React, { useContext, useState, useRef } from "react";
import Swal from "sweetalert2";
import Layout from "../../components/layout/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import Button from "../../components/ui/Button";
import AppContext from "../../context/AppContext";
import getCoupons from "../../utils/getCoupons";
import { removeCoupon } from "../../utils/removeCoupon";
import { setCoupon } from "../../utils/setCoupon";

export default function Coupons({ coupons }) {
  const {
    state: { login },
  } = useContext(AppContext);
  const [isAdding, setIsAdding] = useState(false);
  const couponCodeRef = useRef(null);
  const amountRef = useRef(null);
  const router = useRouter();
  const { query } = router;

  const handleNextPage = () => {
    let nextPage = +query.offset + 3 || 3;
    router.push(`/admin/coupons?offset=${nextPage}`);
  };
  const handlePreviousPage = () => {
    let prevPage = +query.offset - 3;
    router.push(`/admin/coupons?offset=${prevPage}`);
  };

  const handleSetCoupon = async () => {
    const couponCode = couponCodeRef.current.value;
    const amount = +amountRef.current.value || 0;

    const data = await setCoupon({ couponCode: couponCode, discount: amount });

    if (data.errors || !data.data)
      return Swal.fire({
        title: "Error",
        text: "Error al cargar el código, servidor caído",
        icon: "error",
      });
    else if (data.data.insertCupon.success) {
      Swal.fire({
        title: "Éxito",
        text: "El cupón se ha cargado con éxito",
        icon: "success",
      });
      couponCodeRef.current.value = "";
      amountRef.current.value = "";
      setIsAdding(false);
      return router.replace(router.asPath);
    } else
      return Swal.fire({
        title: "Error",
        text: "No se pudo cargar el cupón, algo salió mal",
        icon: "error",
      });
  };

  const handleRemoveCoupon = async (couponCode) => {
    const data = await removeCoupon({ couponCode: couponCode });

    if (data.errors || !data.data)
      return Swal.fire({
        title: "Error",
        text: "Error al eliminar el cupón, servidor caído",
        icon: "error",
      });
    else if (data.data.eliminarCupon.success) {
      Swal.fire({
        title: "Éxito",
        text: "El cupón se ha eliminado con éxito",
        icon: "success",
      });
      setIsAdding(false);
      return router.replace(router.asPath);
    } else
      return Swal.fire({
        title: "Error",
        text: "Error al eliminar el cupón",
        icon: "error",
      });
  };

  return (
    <Layout>
      <ProtectedRoute
        myBoolean={login.usuario?.admin}
        isLoading={login.isLoading}
        path="/login"
      >
        <section className="px-4 flex flex-col gap-4 justify-center items-center my-8 overflow-auto max-sm:text-[12px]">
          <table className="table-fixed text-center border border-black text-slate-800">
            <thead className="bg-gray-400">
              <tr className="text-black">
                <th className="px-4 py-2 border border-black">Cupón</th>
                <th className="px-4 py-2 border border-black">Descuento</th>
                <th className="px-4 py-2 border border-black">Usado</th>
                <th className="px-4 py-2 border border-black">-</th>
              </tr>
            </thead>
            <tbody>
              {coupons.cupones.map((item, index) => (
                <tr
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-400"}
                  key={item.codigo_cupon}
                >
                  <td className="px-4 py-2 border border-black">
                    {item.codigo_cupon}
                  </td>
                  <td className="px-4 py-2 border border-black">
                    {item.porc_descuento} %
                  </td>
                  <td className="px-4 py-2 border border-black">
                    {item.utilizado ? "Sí" : "No"}
                  </td>
                  <td
                    onClick={() => handleRemoveCoupon(item.codigo_cupon)}
                    className="px-4 py-2 border border-black text-red-600 cursor-pointer"
                  >
                    Eliminar
                  </td>
                </tr>
              ))}
              {isAdding && (
                <tr>
                  <td className="border border-black">
                    <div className="w-18 mx-auto">
                      <input
                        required
                        ref={couponCodeRef}
                        placeholder="BLACFR1D4Y"
                        className="w-full py-2 px-4 outline-none"
                        type="text"
                      />
                    </div>
                  </td>
                  <td className="border border-black">
                    <input
                      ref={amountRef}
                      className="w-16 py-2 outline-none"
                      type="number"
                      required
                      defaultValue={1}
                      min={1}
                      max={99}
                    />
                  </td>
                  <td></td>
                  <td className="border-l border-black">
                    <button onClick={handleSetCoupon} className="text-blue-500">
                      Guardar
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex gap-4 text-blue-500">
            {coupons.page !== 1 && (
              <button onClick={handlePreviousPage} className="mx-4">
                ««
              </button>
            )}

            <p className="text-black">
              {coupons.page} de {coupons.maxPage}
            </p>

            {coupons.page !== coupons.maxPage && (
              <button onClick={handleNextPage} className="mx-4">
                »»
              </button>
            )}
          </div>

          <div>
            {isAdding ? (
              <Button handleClick={() => setIsAdding(false)}>cancelar</Button>
            ) : (
              <Button handleClick={() => setIsAdding(true)}>
                agregar cupón
              </Button>
            )}
          </div>
        </section>
      </ProtectedRoute>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const limit = query.limit || 3;
  const offset = query.offset || 0;
  try {
    const data = await getCoupons({ limit: limit, offset: offset });
    const coupons = data.data.getCupones;
    return {
      props: {
        coupons,
      },
    };
  } catch (error) {
    const coupons = null;
    return {
      props: {
        coupons,
      },
    };
  }
}
