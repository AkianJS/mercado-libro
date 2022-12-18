import React from "react";

const BookDetailsCategory = ({ book, login, isEditing, register }) => {
  const category = book.tema?.map((item) => item.nombre);
  return (
    <div className="mt-4 flex gap-2">
      {login.usuario?.admin && isEditing ? (
        <>
          <p>Categoría: </p>
          <input
            {...register("themes")}
            className="bg-gray-200 rounded-sm w-full"
            type="text"
          />
        </>
      ) : (
        <p className="text-gray-600">Categoría: {category.join(", ")}</p>
      )}
    </div>
  );
};

export default BookDetailsCategory;
