import Image from "next/image";
import Link from "next/link";
import React from "react";
import noImage from "../public/NoImage.png";

const BookCard = ({ book, withPrice, quantity }) => {
  const autor = book?.autor?.map((item) => item.nombre) || ["Sin nombre"];
  const discount =
    book?.descuento !== 0 ? (book?.descuento / 100) * book?.precio : null;
  return (
    <li className="border-2 rounded-md shadow-lg bg-white flex flex-col items-center relative w-[250px] h-[380px] pb-1 overflow-hidden duration-150 hover:border-violet-600 hover:border-2">
      {discount > 0 && (
        <p className="absolute left-0 top-0 bg-red-600 text-white p-2 pl-4 pr-4 font-bold rounded-sm shadow-md">
          - {book.descuento} %
        </p>
      )}
      <Link
        className="flex flex-col w-full h-full items-center"
        href={`/books/${book.isbn}`}
      >
        <div>
          <Image
            className="w-[150px] h-[220px]"
            width={150}
            height={0}
            src={book?.url_imagen || noImage}
            alt={book?.titulo}
          />
        </div>
        <div className="p-4 w-full h-full flex flex-col">
          <div className="w-full max-h-12 overflow-hidden">
            <p className="text-center">{book?.titulo}</p>
          </div>
          <p className="text-sm text-gray-600">{autor.join(", ")}</p>
          <div className="mt-auto" >
            {withPrice && discount ? (
              <>
                <p className="line-through text-center text-gray-500 text-sm">
                  {book?.precio} $
                </p>
                <p className="text-center text-emerald-600">
                  {(book.precio - discount).toFixed(2)} $
                </p>
              </>
            ) : (
              withPrice && (
                <p className=" text-center text-emerald-600">{book.precio} $</p>
              )
            )}
          </div>
          {quantity && (
            <p className="mt-4 text-center text-emerald-600">
              Cantidad {quantity}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
};

export default BookCard;
