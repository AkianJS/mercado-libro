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
      setMessage("Error en el servidor, no se pudo cargar el cupón");
    else if (
      data.agregarCupon?.cupon &&
      data.agregarCupon?.success &&
      !data.agregarCupon?.cupon?.utilizado
    )
      setMessage("Cupon cargado correctamente!");
    else if (data.agregarCupon?.cupon?.utilizado)
      setMessage("Cupón ya utilizado");
    else setMessage("No hay ningún cupón para cargar");
    updateUserInfo();
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  console.log(login);
  return (
    <div className="max-w-3xl ml-auto mr-auto p-6">
      <hr className="border-t-2 mr-8 ml-8 " />
      {cartHasSomething && (
        <div className="w-3/4  p-4 m-auto flex flex-col justify-center items-center mt-4 border-gray-600 border-2">
          <p className="text-xl font-bold">
            Cantidad de libros: {totalOfBooks}
          </p>
          <div className="flex justify-center items-center w-full">
            <h4 className="text-xl font-bold">Total: </h4>
            <p
              className={`ml-auto font-bold ${
                discountCoupon ? "line-through" : undefined
              }`}
            >
              {total} $
            </p>
          </div>

          {/* Lógica del descuento por cupón */}
          {discountCoupon && (
            <div className="flex justify-center items-center w-full">
              <h4 className="text-lg font-bold">
                Cupón: {discountCoupon?.codigo_cupon}
              </h4>
              <p className="ml-auto font-bold text-emerald-600">
                {(
                  total -
                  (discountCoupon?.porc_descuento / 100) * total
                ).toFixed(2)}{" "}
                $
              </p>
            </div>
          )}

          {!login.usuario?.carrito?.cupon?.utilizado && (
            <div className="mt-4 flex flex-wrap justify-center items-center w-full bg-gray-400 p-2 pl-1 pr-1">
              <FaCaretRight />
              <input
                ref={couponRef}
                className="bg-gray-400 border-b-2 border-black placeholder:opacity-70 placeholder:text-black outline-none w-[30vw] max-w-sm"
                placeholder="Cupón de descuento"
                type="text"
              />

              <button
                onClick={handleAddCoupon}
                className={`bg-black text-white ml-4 p-1 pl-2 pr-2 rounded-sm ${
                  discountCoupon ? "pointer-events-none" : undefined
                }`}
              >
                Agregar
              </button>
            </div>
          )}
          {message && <p className="text-center">{message}</p>}
          <button
            onClick={handleOnClick}
            className={`bg-teal-600 text-white mt-4 ml-4 p-1 pl-2 pr-2 rounded-sm flex items-center gap-2 hover:scale-105 ease-linear duration-100 `}
          >
            {finalButtonText} <FaAngleDoubleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default TotalAmountCart;
