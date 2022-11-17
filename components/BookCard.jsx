import Image from "next/image";
import Link from "next/link";
import React from "react";
import noImage from "../public/NoImage.png";

const BookCard = ({ book }) => {
  return (
    <li className="rounded-md shadow-lg bg-white flex flex-col items-center">
      <Link className="flex flex-col items-center" href={`/books/${book.isbn}`}>
        <Image
          width={150}
          height={188}
          src={book.thumbnailUrl || noImage}
          alt={book.title}
        />
        <div className="p-4">
          <p className="text-start">
            <strong>Tituulo: </strong>
            {book.title}
          </p>
          <p>
            <strong>Autor/es: </strong> {book.authors.join(", ")}
          </p>
        </div>
      </Link>
      <Link className="w-full mt-auto" href="/checkout">
        <button 
        className="rounded-sm w-full bg-black text-white p-2 hover:opacity-80"
        type="button">Comprar</button>
      </Link>
    </li>
  );
};

export default BookCard;
