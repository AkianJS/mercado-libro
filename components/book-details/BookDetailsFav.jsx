import React from "react";
import { FaHeart, FaSave } from "react-icons/fa";
import { BiEditAlt, BiSave } from "react-icons/bi";

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
            <BiSave className="text-4xl" />
          ) : (
            <BiEditAlt className="text-4xl" />
          )}
        </button>
      )}
      {!login.usuario?.admin && (
        <FaHeart
          onClick={isFavourite ? handleRemoveFavourite : handleSetFavourite}
          className={`text-3xl text-white cursor-pointer self-end ml-auto self- hover:scale-105
      ${
        isFavourite ? "text-red-500" : "text-white stroke-black stroke-[20px]"
      }`}
        />
      )}
    </div>
  );
};

export default BookDetailsFav;
