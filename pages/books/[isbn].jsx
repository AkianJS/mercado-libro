import React, { useContext, useRef } from "react";
import Layout from "../../components/layout/Layout";
import Image from "next/image";
import AppContext from "../../context/AppContext";
import Button from "../../components/ui/Button";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { getBooks } from "../../utils/getBooks";

const Book = ({ book }) => {
  const {
    state: { login },
    setFavourite,
    removeFavourite,
    addToCart
  } = useContext(AppContext);

  const buyQuantityRef = useRef()

  const handleSetFavourite = () => {
    login.success
      ? setFavourite(book)
      : alert(
          "Regístrese en el ícono de usuario para guardar sus libros favoritos"
        );
  };

  const handleRemoveFavourite = () => {
    removeFavourite(book);
  };

  const handleAddToCart = () => {
    const quantity = book.stock > 0 ? buyQuantityRef.current.value || 1 : null
    quantity && login.success ? addToCart(book) : alert('No hay stock, intente más tarde')

  }

  const author = ['Nigga']
  const discount = book?.descuento
    ? (book.descuento / 100) * book.precio
    : null;
  const isFavourite = login?.usuario?.favorito?.find(
    (item) => item.isbn === book.isbn
  );
  const category = book?.tema?.map((item) => item.nombre);

  console.log(isFavourite)
  return (
    <Layout title={book.titulo}>
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
                  ? "text-red-500"
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
          <div
            className={`flex justify-end items-start gap-2 ${
              discount ? "mt-2" : "mt-14"
            }`}
          >
            <p
              className={`${
                discount ? " text-gray-500 text-xl line-through" : "text-xl"
              } mb-16 font-bold text-right`}
            >
              {book.precio} $
            </p>
            {discount ? (
              <span className="h-8 bg-red-600 text-white font-bold p-1">
                - {book.descuento} %
              </span>
            ) : (
              ""
            )}
          </div>
          <hr />
          <h4 className="mt-4 mb-4 text-2xl">
            <strong>Descripción</strong>
          </h4>
          <p className="text-gray-600">{book.descripcion}</p>
          <p className="text-gray-600 uppercase mt-4">Isbn: {book.isbn}</p>
          <p className="mt-4 text-gray-600">
            Editorial: {book?.editorial?.nombre}
          </p>
          <p className="mt-4 text-gray-600">Idioma: {book.idioma?.nombre}</p>
          <p className="mt-4 text-gray-600">Categoría: {category?.join(", ")}</p>
          <div>
            <p className="mt-6 text-gray-600 text-sm uppercase">
              {book.stock > 0 ? (
                `${book.stock} ejemplares disponibles`
              ) : (
                <span className="text-red-500">Ningun ejemplar disponible</span>
              )}
            </p>
            <div className="min-w-72 max-w-screen-md mt-2 flex flex-wrap gap-4">
              <div onClick={handleAddToCart} className="relative w-72">
                <Button text="Agregar al carrito" type="submit" />
                <FaCartPlus className="absolute right-2 top-1.5 text-white text-3xl cursor-pointer" />
              </div>
              <input
                ref={buyQuantityRef}
                className={`bg-black w-12 text-white rounded-[0.25rem] pl-2 pr-1`}
                type="number"
                placeholder={1}
                min={book.stock > 0 ? 1 : 0}
                max={book.stock}
              />
            </div>
          </div>

          <hr className="mt-8" />
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
    data: { getLibro },
  } = res;

  const book = getLibro?.libro[0];

  return {
    props: {
      book,
    },
  };
}

export default Book;
