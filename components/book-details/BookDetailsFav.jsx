import React from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const BookDetailsFav = ({
  book,
  login,
  isEditing,
  setIsEditing,
  Toast,
  setFavourite,
  removeFavourite,
}) => {
  const isFavourite = login?.usuario?.favorito?.find(
    (item) => item.isbn === book.isbn
  );

  //   Funciones
  const handleSetFavourite = () => {
    if (login.success) {
      Toast.fire({
        icon: "success",
        title: `"${book.titulo}" agregado a favoritos!`,
      });
      setFavourite(book);
    } else
      Toast.fire({
        icon: "error",
        title: `Regístrese para agregar libros a favoritos!`,
      });
  };

  const handleRemoveFavourite = () => {
    removeFavourite(book);
  };

  return (
    <div className="text-right">
      {login.usuario?.admin && (
        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? (
            <CgClose className="text-4xl text-slate-800 dark:text-slate-100 transition-colors" />
          ) : (
            <BiEditAlt className="text-4xl text-slate-800 dark:text-slate-100 transition-colors" />
          )}
        </button>
      )}
      {!login.usuario?.admin && (
        <FaHeart
          onClick={isFavourite ? handleRemoveFavourite : handleSetFavourite}
          className={`text-3xl cursor-pointer self-end ml-auto hover:scale-105 transition-colors
      ${
        isFavourite ? "text-red-500 dark:text-red-400" : "text-white dark:text-slate-300 stroke-black dark:stroke-slate-500 stroke-[20px]"
      }`}
        />
      )}
    </div>
  );
};

export default BookDetailsFav;
