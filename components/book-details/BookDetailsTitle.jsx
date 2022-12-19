import React from "react";
import Loader from "../ui/Loader";

const BookDetailsTitle = ({ book, login, isEditing, register }) => {
  if (!book || login.isLoading) <Loader />;
  return (
    <div className="text-2xl">
      {login.usuario?.admin && isEditing ? (
        <>
          <input
            {...register("title")}
            className="p-1 bg-gray-200 rounded-sm outline-none w-full"
            type="text"
          />
        </>
      ) : (
        <h2>{book.titulo}</h2>
      )}
    </div>
  );
};

export default BookDetailsTitle;
