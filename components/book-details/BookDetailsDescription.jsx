import React from "react";

const BookDetailsDescription = ({ book, login, isEditing, register }) => {
  return (
    <div>
      {login.usuario?.admin && isEditing ? (
        <>
          <textarea
            {...register("description")}
            defaultValue={book.descripcion}
            className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors w-full"
            rows="15"
          ></textarea>
        </>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 transition-colors">{book.descripcion}</p>
      )}
    </div>
  );
};

export default BookDetailsDescription;
