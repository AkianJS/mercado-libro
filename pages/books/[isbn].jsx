import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import AppContext from "../../context/AppContext";
import Button from "../../components/ui/Button";
import Swal from "sweetalert2";
import { FaCartPlus, FaWindowClose } from "react-icons/fa";
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
import BookDetailsImage from "../../components/book-details/BookDetailsImage";
import Loader from "../../components/ui/Loader";
import { setBook } from "../../utils/setBook";
import BookDetailsEditionDate from "../../components/book-details/BookDetailsEditionDate";
import { useRouter } from "next/router";
import { getThemes } from "../../utils/getThemes";
import Modal from "../../components/ui/Modal";
import { removeBook } from "../../utils/removeBook";

const Book = ({ book, getTemas }) => {
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
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [imageChange, setImageChange] = useState();
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const defaultValues = {
      title: book?.titulo,
      imageUrl: book?.url_imagen,
      author: book?.autor?.map((item) => item.nombre).join(", "),
      price: book?.precio,
      discount: book?.descuento,
      description: book?.descripcion,
      language: book?.idioma?.nombre,
      editorial: book?.editorial?.nombre,
      themes: book?.tema,
      stock: book?.stock,
      editionDate: book?.fecha_edicion,
      entryDate: book.fecha_ingreso,
      isbn: book?.isbn,
    };
    reset(defaultValues);
  }, []);

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

  const onSubmit = async (result) => {
    let author = JSON.stringify([result.author]);
    let description = JSON.stringify(result.description);
    let themes = result.themes?.map((item) => item.nombre);

    const values = {
      author: author,
      title: result.title,
      description: description,
      discount: +result.discount || null,
      isbn: book.isbn,
      image: result.imageUrl,
      language: result.language,
      editorial: result.editorial,
      price: +result.price,
      stock: +result.stock,
      themes: JSON.stringify(themes),
      editionDate: result.editionDate,
      entryDate: "20/11/2021",
    };
    const res = await setBook(values);
    const { errors, data } = res;
    console.log(res);

    if (errors || !data)
      Swal.fire({
        title: "Error!",
        text: "El servidor está caído, intente más tarde",
        icon: "error",
        confirmButtonText: "Continuar",
      });
    else if (data.insertLibro?.success) {
      Swal.fire({
        title: "Éxito!",
        text: "Se ha modificado el libro correctamente",
        icon: "success",
        confirmButtonText: "Continuar",
      });
      setIsEditing(false);
      router.replace(router.asPath);
    }
  };

  const handleRemoveBook = async () => {
    const res = await removeBook({ isbn: book.isbn });
    const { errors, data } = res;
    console.log(res)
    if (errors || !data) {
      Swal.fire({
        title: "Error!",
        text: "El servidor está caído, intente más tarde",
        icon: "error",
        confirmButtonText: "Continuar",
      });
    } else if (data.eliminarLibro?.success) {
      Swal.fire({
        title: "Éxito!",
        text: "Libro eliminado correctamente",
        icon: "success",
        confirmButtonText: "Continuar",
      });
      router.push('/books')
    } else {
      Swal.fire({
        title: "Error!",
        text: "No se ha podido eliminar el libro",
        icon: "error",
        confirmButtonText: "Continuar",
      });
    }
  };

  if (!book)
    return (
      <Layout>
        <div className="flex justify-center mt-4">
          <Loader />
        </div>
      </Layout>
    );

  return (
    <Layout title={book.titulo}>
      <section className="mt-8 pl-4 pr-4 flex flex-wrap justify-center gap-6 max-w-screen-xl ml-auto mr-auto">
        <BookDetailsImage
          book={book}
          login={login}
          isEditing={isEditing}
          register={register}
          setValue={setValue}
          setImageChange={setImageChange}
        />

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
            <BookDetailsTitle
              book={book}
              login={login}
              isEditing={isEditing}
              register={register}
            />
            <BookDetailsAuthor
              book={book}
              isEditing={isEditing}
              login={login}
              register={register}
            />
            <StarsRating Toast={Toast} book={book} login={login} />
            <BookDetailsDiscount
              book={book}
              isEditing={isEditing}
              login={login}
              register={register}
            />

            <hr className="mt-8" />
            <h4 className="mt-4 mb-4 text-2xl">
              <strong>Descripción</strong>
            </h4>

            <BookDetailsDescription
              book={book}
              isEditing={isEditing}
              login={login}
              register={register}
            />
            <BookDetailsIsbn book={book} isEditing={isEditing} login={login} />
            <BookDetailsEditorial
              book={book}
              isEditing={isEditing}
              login={login}
              register={register}
            />
            <BookDetailsEditionDate
              book={book}
              isEditing={isEditing}
              login={login}
              register={register}
            />
            <BookDetailsCategory
              book={book}
              isEditing={isEditing}
              login={login}
              register={register}
              control={control}
              getTemas={getTemas}
            />
            <BookDetailsLanguage
              book={book}
              isEditing={isEditing}
              login={login}
              register={register}
            />
            <BookDetailsStock
              book={book}
              isEditing={isEditing}
              login={login}
              register={register}
            />
            <br />
            {login.usuario?.admin && <Button type="submit">Modificar</Button>}
          </form>
          <Button
            handleClick={() => setModalShow(true)}
            background="rgba(220,38,38, .9)"
            className="mt-4"
          >
            Eliminar Libro
          </Button>
          <Modal show={modalShow}>
            <div className="bg-white p-4 rounded-lg flex flex-col gap-2">
              <button className="ml-auto mr-0 text-xl">
                <FaWindowClose />
              </button>
              <h4>Está seguro de eliminar {book.titulo}?</h4>
              <div className="grid grid-cols-2 gap-4">
                <Button handleClick={handleRemoveBook}>Eliminar</Button>
                <Button handleClick={() => setModalShow(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal>
          <div>
            {!login.usuario?.admin && (
              <div className="min-w-72 max-w-screen-md mt-2 flex flex-wrap gap-4">
                <div onClick={handleAddToCart} className="relative w-72">
                  <Button type="button">Agregar al carrito</Button>
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

  // Traer la info del libro
  try {
    const res = await getBooks({ isbn: isbn });
    const res2 = await getThemes();

    const {
      data: { getTemas },
    } = res2;

    const {
      data: { getLibro },
    } = res;

    const book = getLibro?.libro[0];
    return {
      props: {
        book,
        getTemas,
      },
    };
  } catch (err) {
    const book = null;
    return {
      props: { book },
    };
  }
}

export default Book;
