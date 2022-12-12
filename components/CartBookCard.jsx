import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { removeOneFromCart } from "../utils/removeOneFromCart";
import { setBookTocart } from "../utils/setBookToCart";
import { removeAllFromCart } from "../utils/removeAllFromCart";
import Link from "next/link";

const CartBookCard = ({ cartBook, token, updateUserInfo }) => {
  const { libro } = cartBook;
  const author = libro.autor.map((item) => item.nombre);
  const discount = libro.descuento
    ? (libro.descuento / 100) * libro.precio
    : null;

  // Funciones para añadir, restar o eliminar libros
  const handleRemoveOne = async () => {
    await removeOneFromCart({ quantity: 1, isbn: libro.isbn, token: token });
    updateUserInfo();
  };

  const handleAddOne = async () => {
    await setBookTocart({ quantity: 1, isbn: libro.isbn, token: token });
    updateUserInfo();
  };

  const handleRemoveAll = async () => {
    await removeAllFromCart({ isbn: libro.isbn, token: token });
    updateUserInfo();
  };

  return (
    <div className="flex justify-center flex-wrap gap-6">
      <div className="relative w-36 h-48">
        <Link href={`/books/${libro.isbn}`}>
          <Image
            className="rounded-lg"
            fill
            alt={libro.titulo}
            src={libro.url_imagen}
          />
        </Link>
      </div>
      <div className="w-72">
        <Link href={`/books/${libro.isbn}`}>
          <h3 className="font-bold text-base text-center">{libro?.titulo}</h3>
        </Link>
        <p className="text-sm text-gray-600">{author}</p>

        <div className="mt-4">
          {discount ? (
            <>
              <p className="line-through text-sm">{libro.precio} $</p>
              <div className="flex gap-4">
                <p className="font-bold text-emerald-600">
                  {(libro.precio - discount).toFixed(2)} $
                </p>
                <p className="font-bold text-white bg-red-500 pr-2 pl-2">
                  - {libro.descuento} %
                </p>
              </div>
            </>
          ) : (
            <p>{libro.precio} $</p>
          )}
          <div className="mt-4 flex gap-4 justify-center items-center ">
            <p>Total: {libro.precio * cartBook.cantidad} $</p>
            <button onClick={handleRemoveOne} className="bg-black p-1">
              <FaMinus className="text-white" />
            </button>
            <p>{cartBook.cantidad}</p>
            <button onClick={handleAddOne} className="bg-black p-1">
              <FaPlus className="text-white" />
            </button>
            <button onClick={handleRemoveAll} className="text-2xl ml-auto">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBookCard;
