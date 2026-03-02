import Image from "next/image";
import Link from "next/link";
import React from "react";
import noImage from "../public/NoImage.png";

const BookCard = ({ book, withPrice, quantity }) => {
  const autor = book?.autor?.map((item) => item.nombre) || ["Sin nombre"];
  const discount =
    book?.descuento !== 0 ? (book?.descuento / 100) * book?.precio : null;
  return (
    <li className="rounded-xl bg-white dark:bg-slate-800 flex flex-col items-center relative w-[240px] h-[390px] pb-1 overflow-hidden duration-200 hover:shadow-xl hover:-translate-y-1 border border-slate-200 dark:border-slate-700 cursor-pointer group transition-all" style={{boxShadow: 'var(--card-shadow)'}}>
      {discount > 0 && (
        <p className="absolute left-0 top-0 bg-red-500 dark:bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-br-lg z-10">
          - {book.descuento} %
        </p>
      )}
      <Link
        className="flex flex-col w-full h-full items-center"
        href={`/books/${book.isbn}`}
      >
        <div className="bg-slate-50 dark:bg-slate-700/50 w-full flex justify-center py-3 transition-colors">
          <Image
            className="w-[150px] h-[220px] object-contain"
            width={150}
            height={0}
            src={book?.url_imagen || noImage}
            alt={book?.titulo}
          />
        </div>
        <div className="p-4 w-full h-full flex flex-col">
          <div className="w-full max-h-12 overflow-hidden">
            <p className="text-center font-medium text-slate-800 dark:text-slate-100 text-sm">{book?.titulo}</p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{autor.join(", ")}</p>
          <div className="mt-auto" >
            {withPrice && discount ? (
              <>
                <p className="line-through text-center text-slate-400 dark:text-slate-500 text-xs">
                  {book?.precio} $
                </p>
                <p className="text-center text-emerald-600 dark:text-emerald-400 font-semibold">
                  {(book.precio - discount).toFixed(2)} $
                </p>
              </>
            ) : (
              withPrice && (
                <p className="text-center text-emerald-600 dark:text-emerald-400 font-semibold">{book.precio} $</p>
              )
            )}
          </div>
          {quantity && (
            <p className="mt-4 text-center text-emerald-600 dark:text-emerald-400 text-sm">
              Cantidad {quantity}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
};

export default BookCard;
