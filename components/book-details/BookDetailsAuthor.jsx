import React from "react";

const BookDetailsAuthor = ({ book, login, isEditing }) => {
  const author = book?.autor?.map((item) => item.nombre);

  return (
    <div className="mt-4">
      {login.usuario?.admin && isEditing ? (
        <>
          {/* <label className="text-base uppercase" htmlFor="title">
            Autor
          </label> */}

          <input
            className="bg-gray-200 rounded-sm outline-none"
            name="title"
            defaultValue={author?.join(", ")}
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
