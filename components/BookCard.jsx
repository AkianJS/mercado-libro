import Image from "next/image";
import Link from "next/link";
import React from "react";
import noImage from "../public/NoImage.png";

const BookCard = ({ book, withPrice }) => {
  const autor = book?.autor?.map((item) => item.nombre) || ["Sin nombre"];

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
          <p className="text-center">{book?.titulo}</p>
          <p className="text-sm text-gray-600">{autor.join(", ")}</p>
          {withPrice && <p className="mt-4 text-center text-emerald-600">{book.precio} $</p>}
        </div>
      </Link>
    </li>
  );
};

export default BookCard;
