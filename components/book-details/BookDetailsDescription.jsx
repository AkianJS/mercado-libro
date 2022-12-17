import React from "react";

const BookDetailsDescription = ({ book, login, isEditing }) => {
  return (
    <div>
      {login.usuario?.admin && isEditing ? (
        <>
          <textarea
            defaultValue={book.descripcion}
            className="bg-gray-200 rounded-sm w-full"
            rows="15"
          ></textarea>
        </>
      ) : (
        <p className="text-gray-600">{book.descripcion}</p>
      )}
    </div>
  );
};

export default BookDetailsDescription;
