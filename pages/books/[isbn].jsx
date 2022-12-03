import React, { useContext } from "react";
import { getBooks } from "../../utils/getBooks";
import Layout from "../../components/layout/Layout";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import AppContext from "../../context/AppContext";
import { useRouter } from "next/router";

const Book = ({ book }) => {
  const {
    state: { login },
    setFavourite,
    removeFavourite,
  } = useContext(AppContext);

  const handleSetFavourite = () => {
    login.success ? setFavourite(book) : console.log("error no ta logueau");
  };

  const handleRemoveFavourite = () => {
    removeFavourite(book);
  };

  const author = book?.autor.map((item) => item.nombre);
  const discount = book.descuento ? book.descuento * book.precio : null;
  const isFavourite = login?.usuario?.favorito?.find(
    (item) => item.isbn === book.isbn
  );
  const category = book.tema.map(item => item.nombre)

  return (
    <Layout>
      <section className="mt-8 pl-4 pr-4 flex flex-wrap justify-center gap-6 max-w-screen-xl m-auto">
        <div className="mb-4">
          <Image
            width={256}
            height={459}
            alt={book.titulo}
            src={book.url_imagen}
          />
        </div>
        <div className="w-128">

          <div className="flex gap-4">
            <h2 className="text-2xl">{book.titulo}</h2>
            <FaHeart
              onClick={isFavourite ? handleRemoveFavourite : handleSetFavourite}
              className={`text-3xl text-white cursor-pointer self-end ml-auto self- hover:scale-105
              ${
                isFavourite
                  ? "text-red-600"
                  : "text-white stroke-black stroke-[20px]"
              }`}
            />
          </div>
          <p className="text-gray-500 text-lg">{author.join(", ")}</p>
          {discount && (
            <p className="mt-14 text-right text-2xl font-bold text-emerald-600">
              {book.precio - discount} $
            </p>
          )}
          <div className={`flex justify-end items-start gap-2 ${discount ? 'mt-2' : 'mt-14'}`}>
            <p
              className={`${
                discount
                  ? " text-gray-500 text-xl line-through"
                  : "text-xl"
              } mb-16 font-bold text-right`}
            >
              {book.precio} $
            </p>
            {discount ? (
              <span className="h-8 bg-red-600 text-white font-bold p-1">-20 %</span>
            ) : (
              ""
            )}
          </div>
          <hr />
          <h4 className="mt-4 mb-4 text-2xl">
            <strong>Descripción</strong>
          </h4>
          <p className="text-gray-600">{book.descripcion}</p>
          <p className="mt-4 text-gray-600">Editorial: {book.editorial.nombre}</p>
          <p className="mt-4 text-gray-600">Idioma: {book.idioma.nombre}</p>
          <p className="mt-4 text-gray-600">Categoría: {category.join(', ')}</p>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const {
    params: { isbn },
  } = context;
  const res = await getBooks({ isbn: isbn });
  const {
    data: { getLibros },
  } = res;
  const book = getLibros?.libro[0];

  return {
    props: {
      book,
    },
  };
}

export default Book;
