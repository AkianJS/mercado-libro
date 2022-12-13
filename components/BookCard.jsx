import Image from "next/image";
import Link from "next/link";
import React from "react";
import noImage from "../public/NoImage.png";

const BookCard = ({ book, withPrice, quantity }) => {
  const autor = book?.autor?.map((item) => item.nombre) || ["Sin nombre"];
  const discount =
    book?.descuento !== 0 ? (book?.descuento / 100) * book?.precio : null;
  return (
    <li className="rounded-md shadow-lg bg-white flex flex-col items-center relative">
      <Link className="flex flex-col items-center" href={`/books/${book.isbn}`}>
        <Image
          className="w-[150px] h-[220px]"
          width={150}
          height={"220"}
          src={book?.url_imagen || noImage}
          alt={book?.titulo}
        />
        <div className="p-4">
          <div className="w-full max-h-12 overflow-hidden">
            <p className="text-center">{book?.titulo}</p>
          </div>
          <p className="text-sm text-gray-600">{autor.join(", ")}</p>
          {withPrice && discount ? (
            <>
              <p className="line-through mt-4 text-center text-gray-500 text-sm">
                {book?.precio} $
              </p>
              <p className="text-center text-emerald-600">
                {(book.precio - discount).toFixed(2)} $
              </p>
            </>
          ) : (
            withPrice && (
              <p className="mt-4 text-center text-emerald-600">
                {book.precio} $
              </p>
            )
          )}{" "}
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
