import React, { useMemo, useRef } from "react";
import { FaAngleDoubleRight, FaCaretRight } from "react-icons/fa";

const TotalAmountCart = ({cartHasSomething, handleOnClick, finalButtonText, login }) => {
  const couponRef = useRef();

  const total = useMemo(() => {
    if (login?.usuario?.carrito?.length > 1) {
      return login?.usuario?.carrito?.reduce(
        (prev, current) => prev + current?.libro?.precio * current?.cantidad,
        0
      );
    } else
      return (
        login?.usuario?.carrito[0]?.cantidad *
        login?.usuario?.carrito[0]?.libro?.precio
      );
  }, [login?.usuario?.carrito]);

  const totalOfBooks = login?.usuario?.carrito?.reduce((prev, current) => prev + current.cantidad, 0)
  const handleAddCoupon = () => {};

  return (
    <div className="max-w-3xl ml-auto mr-auto p-6">
      <hr className="border-t-2 mr-8 ml-8 " />
      {cartHasSomething && (
        <div className="w-3/4  p-4 m-auto flex flex-col justify-center items-center mt-4 border-gray-600 border-2">
            <p className="text-xl font-bold">Cantidad de libros: {totalOfBooks}</p>
          <div className="flex justify-center items-center w-full">
            <h4 className="text-xl font-bold">Total: </h4>
            <p className="ml-auto font-bold">{total} $</p>
          </div>
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
              className="bg-black text-white ml-4 p-1 pl-2 pr-2 rounded-sm"
            >
              Agregar
            </button>
          </div>
          <button
            onClick={handleOnClick}
            className="bg-teal-600 text-white mt-4 ml-4 p-1 pl-2 pr-2 rounded-sm flex items-center gap-2 hover:scale-105 ease-linear duration-100"
          >
            {finalButtonText} <FaAngleDoubleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default TotalAmountCart;
