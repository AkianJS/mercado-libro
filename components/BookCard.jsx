import Image from "next/image";
import Link from "next/link";
import React from "react";
import noImage from "../public/NoImage.png";

const BookCard = ({ book }) => {
  const autor = book.autor.map(item => item.nombre)
  return (
    <li className="rounded-md shadow-lg bg-white flex flex-col items-center">
      <Link className="flex flex-col items-center" href={`/books/${book.isbn}`}>
        <Image
          width={150}
          height={188}
          src={book?.url_imagen || noImage}
          alt={book?.titulo}
        />
        <div className="p-4">
          <p className="text-start">
            <strong>Titulo: </strong>
            {book?.titulo}
          </p>
          <p>
            <strong>Autor/es: </strong> {autor.join(', ')}
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
