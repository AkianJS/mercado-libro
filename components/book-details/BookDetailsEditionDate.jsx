import React from "react";

const BookDetailsEditionDate = ({ book, login, isEditing, register }) => {
  return (
    <div className="mt-4 flex gap-2">
      {login.usuario?.admin && isEditing ? (
        <>
          <p>Fecha de edición: </p>
          <input
            {...register("editionDate")}
            defaultValue={book.fecha_edicion}
            className="bg-gray-200 rounded-sm"
            type="text"
          />
        </>
      ) : (
        <p className="text-gray-600">Fecha de edición: {book.fecha_edicion}</p>
      )}
    </div>
  );
};

export default BookDetailsEditionDate;
