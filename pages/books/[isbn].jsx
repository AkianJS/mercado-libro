import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import Image from "next/image";
import AppContext from "../../context/AppContext";
import Button from "../../components/ui/Button";
import Swal from "sweetalert2";
import { FaCartPlus } from "react-icons/fa";
import { getBooks } from "../../utils/getBooks";
import { setBookTocart } from "../../utils/setBookToCart";
import Opine from "../../components/Opine";
import StarsRating from "../../components/StarsRating";
import BookDetailsTitle from "../../components/book-details/BookDetailsTitle";
import BookDetailsFav from "../../components/book-details/BookDetailsFav";
import BookDetailsAuthor from "../../components/book-details/BookDetailsAuthor";
import BookDetailsDiscount from "../../components/book-details/BookDetailsDiscount";
import BookDetailsDescription from "../../components/book-details/BookDetailsDescription";
import BookDetailsIsbn from "../../components/book-details/BookDetailsIsbn";
import BookDetailsEditorial from "../../components/book-details/BookDetailsEditorial";
import BookDetailsCategory from "../../components/book-details/BookDetailsCategory";
import BookDetailsLanguage from "../../components/book-details/BookDetailsLanguage";
import BookDetailsStock from "../../components/book-details/BookDetailsStock";
import { useForm } from "react-hook-form";

const Book = ({ book }) => {
  const {
    state: { login },
    setFavourite,
    removeFavourite,
    updateUserInfo,
  } = useContext(AppContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const defaultValues = {
      title: book.titulo
    }
    reset(defaultValues)
  },[])

  const [isEditing, setIsEditing] = useState(false);
  const buyQuantityRef = useRef();

  // Funciones
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("click", Swal.close);
    },
  });

  const handleAddToCart = async () => {
    const quantity = buyQuantityRef.current.value || null;
    if (quantity && login.success) {
      const res = await setBookTocart({
        quantity: quantity,
        isbn: book.isbn,
        token: login.accessToken,
      });
      Toast.fire({
        icon: "success",
        title: `"${book.titulo}" agregado al carrito!`,
      });
      updateUserInfo();
    } else
      Toast.fire({
        icon: "error",
        title: `No se pudo agregar al carrito, intente más tarde`,
      });
  };

  const onSubmit = (data) => {
    console.log(data)

  }

  return (
    <Layout title={book.titulo}>
      <section className="mt-8 pl-4 pr-4 flex flex-wrap justify-center gap-6 max-w-screen-xl mlauto mr-auto">
        <div className="mb-4">
          <Image
            width={256}
            height={459}
            alt={book.titulo}
            src={book.url_imagen}
          />
        </div>
        <div className="w-128">
          <form onSubmit={handleSubmit(onSubmit)}>
            <BookDetailsFav
              book={book}
              isEditing={isEditing}
              login={login}
              setIsEditing={setIsEditing}
              setFavourite={setFavourite}
              removeFavourite={removeFavourite}
              Toast={Toast}
            />
            <BookDetailsTitle book={book} login={login} isEditing={isEditing} register={register} />
            <BookDetailsAuthor
              book={book}
              isEditing={isEditing}
              login={login}
            />
            <StarsRating Toast={Toast} book={book} login={login} />
            <BookDetailsDiscount
              book={book}
              isEditing={isEditing}
              login={login}
            />

            <hr className="mt-8" />
            <h4 className="mt-4 mb-4 text-2xl">
              <strong>Descripción</strong>
            </h4>

            <BookDetailsDescription
              book={book}
              isEditing={isEditing}
              login={login}
            />
            <BookDetailsIsbn book={book} isEditing={isEditing} login={login} />
            <BookDetailsEditorial
              book={book}
              isEditing={isEditing}
              login={login}
            />
            <BookDetailsCategory
              book={book}
              isEditing={isEditing}
              login={login}
            />
            <BookDetailsLanguage
              book={book}
              isEditing={isEditing}
              login={login}
            />
            <BookDetailsStock book={book} isEditing={isEditing} login={login} />
            <br />
            <Button type="submit">Modificar</Button>
          </form>
          <div>
            {!login.usuario?.admin && (
              <div className="min-w-72 max-w-screen-md mt-2 flex flex-wrap gap-4">
                <div onClick={handleAddToCart} className="relative w-72">
                  <Button type="button" >Agregar al carrito</Button>
                  <FaCartPlus className="absolute right-2 top-1.5 text-white text-3xl cursor-pointer" />
                </div>
                <select
                  ref={buyQuantityRef}
                  className={`bg-black w-12 text-white rounded-[0.25rem] pl-2 pr-1`}
                >
                  {book.stock > 0 &&
                    [...Array(book.stock).keys()].map((item) => (
                      <option key={item} value={item + 1}>
                        {item + 1}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </section>
      <br />
      <br />
      <hr className="max-w-screen-xl m-auto " />
      <br />
      <Opine
        book={book}
        login={login}
        Toast={Toast}
        isLoading={login.isLoading}
      />
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
