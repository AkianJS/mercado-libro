import React from "react";

const BookDetailsAuthor = ({ book, login, isEditing, register }) => {
  const author = book?.autor?.map((item) => item.nombre);

  return (
    <div className="mt-4">
      {login.usuario?.admin && isEditing ? (
        <>
          <input
          placeholder="Autor/es"
            {...register("author")}
            className="p-1 bg-gray-200 rounded-sm outline-none w-[40vw] max-w-xl"
            type="text"
          />
        </>
      ) : (
        <p className="text-gray-600">{author.join(", ")}</p>
      )}
    </div>
  );
};

export default BookDetailsAuthor;
