import React, { useMemo, useRef, useState } from "react";
import { FaAngleDoubleRight, FaCaretRight } from "react-icons/fa";
import { setCouponToUser } from "../utils/setCouponToUser";

const TotalAmountCart = ({
  cartHasSomething,
  handleOnClick,
  finalButtonText,
  login,
  updateUserInfo,
}) => {
  const [message, setMessage] = useState(null);
  const couponRef = useRef();

  const total = useMemo(() => {
    if (login?.usuario?.carrito?.items?.length > 1) {
      return login?.usuario?.carrito?.items?.reduce(
        (prev, current) => prev + current?.libro?.precio * current?.cantidad,
        0
      );
    } else
      return (
        login?.usuario?.carrito?.items[0]?.cantidad *
        login?.usuario?.carrito?.items[0]?.libro?.precio
      );
  }, [login?.usuario?.carrito]);

  const totalOfBooks = login?.usuario?.carrito?.items?.reduce(
    (prev, current) => prev + current.cantidad,
    0
  );

  const discountCoupon = login.usuario?.carrito?.cupon
    ? login.usuario?.carrito?.cupon
    : null;

  // Funciones
  const handleAddCoupon = async () => {
    let couponCode = couponRef.current.value;
    const res = await setCouponToUser({
      couponCode: couponCode,
      token: login.accessToken,
    });
    const { errors, data } = res;
    if (errors || !data)
      setMessage("Error en el servidor, no se pudo cargar el cupon");
    else if (
      data.agregarCupon?.cupon &&
      data.agregarCupon?.success &&
      !data.agregarCupon?.cupon?.utilizado
    )
      setMessage("Cupon cargado correctamente!");
    else if (data.agregarCupon?.cupon?.utilizado)
      setMessage("Cupon ya utilizado");
    else setMessage("No hay ningun cupon para cargar");
    updateUserInfo();
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div className="max-w-3xl ml-auto mr-auto p-6">
      <hr className="border-slate-200 dark:border-slate-700 mr-8 ml-8" />
      {cartHasSomething && (
        <div className="w-3/4 p-6 m-auto flex flex-col justify-center items-center mt-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 transition-colors" style={{boxShadow: 'var(--card-shadow)'}}>
          <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Cantidad de libros: {totalOfBooks}
          </p>
          <div className="flex justify-center items-center w-full mt-2">
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">Total: </h4>
            <p
              className={`ml-auto font-bold text-slate-800 dark:text-slate-200 ${
                discountCoupon ? "line-through text-slate-400 dark:text-slate-500" : undefined
              }`}
            >
              {total} $
            </p>
          </div>

          {/* Logica del descuento por cupon */}
          {discountCoupon && (
            <div className="flex justify-center items-center w-full">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Cupon: {discountCoupon?.codigo_cupon}
              </h4>
              <p className="ml-auto font-bold text-emerald-600 dark:text-emerald-400">
                {(
                  total -
                  (discountCoupon?.porc_descuento / 100) * total
                ).toFixed(2)}{" "}
                $
              </p>
            </div>
          )}

          {!login.usuario?.carrito?.cupon?.utilizado && (
            <div className="mt-4 flex flex-wrap justify-center items-center w-full bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
              <FaCaretRight className="text-slate-500 dark:text-slate-400" />
              <input
                ref={couponRef}
                className="bg-transparent border-b border-slate-400 dark:border-slate-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-200 outline-none w-[30vw] max-w-sm"
                placeholder="Cupon de descuento"
                type="text"
              />

              <button
                onClick={handleAddCoupon}
                className={`bg-indigo-500 hover:bg-indigo-600 text-white ml-4 py-1.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  discountCoupon ? "pointer-events-none opacity-50" : undefined
                }`}
              >
                Agregar
              </button>
            </div>
          )}
          {message && <p className="text-center text-sm mt-2 text-slate-600 dark:text-slate-400">{message}</p>}
          <button
            onClick={handleOnClick}
            className="bg-indigo-500 hover:bg-indigo-600 text-white mt-4 py-2 px-4 rounded-lg flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm"
          >
            {finalButtonText} <FaAngleDoubleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default TotalAmountCart;
