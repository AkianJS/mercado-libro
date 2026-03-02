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

  // Funciones para anadir, restar o eliminar libros
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
    <div className="flex justify-center flex-wrap gap-6 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors" style={{boxShadow: 'var(--card-shadow)'}}>
      <div className="relative w-36 h-48">
        <Link href={`/books/${libro.isbn}`}>
          <Image
            className="rounded-lg object-cover"
            fill
            alt={libro.titulo}
            src={libro.url_imagen}
          />
        </Link>
      </div>
      <div className="w-72">
        <Link href={`/books/${libro.isbn}`}>
          <h3 className="font-semibold text-base text-center text-slate-800 dark:text-slate-100">{libro?.titulo}</h3>
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400">{author}</p>

        <div className="mt-4">
          {discount ? (
            <>
              <p className="line-through text-sm text-slate-400 dark:text-slate-500">{libro.precio} $</p>
              <div className="flex gap-4 items-center">
                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                  {(libro.precio - discount).toFixed(2)} $
                </p>
                <p className="font-semibold text-white bg-red-500 dark:bg-red-600 px-2 py-0.5 rounded text-sm">
                  - {libro.descuento} %
                </p>
              </div>
            </>
          ) : (
            <p className="text-slate-800 dark:text-slate-200 font-medium">{libro.precio} $</p>
          )}
          <div className="mt-4 flex gap-4 justify-center items-center">
            <p className="text-slate-700 dark:text-slate-300 font-medium">Total: {libro.precio * cartBook.cantidad} $</p>
            <button onClick={handleRemoveOne} className="bg-indigo-500 hover:bg-indigo-600 p-1.5 rounded-md transition-colors">
              <FaMinus className="text-white text-xs" />
            </button>
            <p className="font-semibold text-slate-800 dark:text-slate-100 w-6 text-center">{cartBook.cantidad}</p>
            <button onClick={handleAddOne} className="bg-indigo-500 hover:bg-indigo-600 p-1.5 rounded-md transition-colors">
              <FaPlus className="text-white text-xs" />
            </button>
            <button onClick={handleRemoveAll} className="text-xl ml-auto text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBookCard;
