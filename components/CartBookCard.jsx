import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const CartBookCard = ({ cartBook }) => {
  const { libro } = cartBook;
  console.log(cartBook);
  const author = libro.autor.map((item) => item.nombre);
  const discount = libro.descuento
    ? (libro.descuento / 100) * libro.precio
    : null;
  return (
    <div className="flex justify-center flex-wrap gap-6">
      <div className="relative w-36 h-48">
        <Image
          className="rounded-lg"
          fill
          alt={libro.titulo}
          src={libro.url_imagen}
        />
      </div>
      <div className="w-72">
        <h3 className="font-bold text-base text-center">
          {cartBook.libro.titulo}
        </h3>
        <p className="text-sm text-gray-600">{author}</p>
        <div className="mt-4">
          {discount ? (
            <>
              <p className="line-through text-sm">{libro.precio} $</p>
              <div className="flex gap-4">
                <p className="font-bold text-emerald-600">
                  {libro.precio - discount} $
                </p>
                <p className="font-bold text-white bg-red-500 pr-2 pl-2">- {libro.descuento} %</p>
              </div>
            </>
          ) : (
            <p>{libro.precio} $</p>
          )}
          <div className="mt-4 flex gap-4 justify-center items-center ">
            <p>Total: {libro.precio * cartBook.cantidad} $</p>
            <button className="bg-black p-1">
              <FaMinus className="text-white"/>
            </button>
            <p>{cartBook.cantidad}</p>
            <button className="bg-black p-1">
              <FaPlus className="text-white" />
            </button>
            <button className="text-2xl ml-auto">
              <FaTrash/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBookCard;
