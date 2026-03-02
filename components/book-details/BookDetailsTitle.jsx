import React from "react";
import Loader from "../ui/Loader";

const BookDetailsTitle = ({ book, login, isEditing, register }) => {
  if (!book || login.isLoading) <Loader />;
  return (
    <div className="text-2xl text-slate-800 dark:text-slate-100 transition-colors">
      {login.usuario?.admin && isEditing ? (
        <>
          <input
            {...register("title")}
            className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors w-full"
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
