import React from "react";

const BookDetailsAuthor = ({ book, login, isEditing, register }) => {
  const author = book?.autor?.map((item) => item.nombre);

  return (
    <div className="mt-4">
      {login.usuario?.admin && isEditing ? (
        <>
          <input
            {...register("author")}
            className="bg-gray-200 rounded-sm outline-none"
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
