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
            className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors w-[40vw] max-w-xl"
            type="text"
          />
        </>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 transition-colors">{author.join(", ")}</p>
      )}
    </div>
  );
};

export default BookDetailsAuthor;
