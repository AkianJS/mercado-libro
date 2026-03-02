import React from "react";

const BookDetailsStock = ({ book, login, isEditing, register }) => {
  return (
    <div className="mt-4 flex gap-2">
      {login.usuario?.admin && isEditing ? (
        <>
          <p className="text-slate-800 dark:text-slate-100 transition-colors">Stock: </p>
          <input
            {...register("stock")}
            defaultValue={book.stock}
            className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors"
            type="number"
          />
        </>
      ) : (
        <p className="mt-6 text-slate-500 dark:text-slate-400 text-sm uppercase transition-colors">
          {book.stock > 0 ? (
            `${book.stock} ejemplares disponibles`
          ) : (
            <span className="text-red-500 dark:text-red-400">Ningun ejemplar disponible</span>
          )}
        </p>
      )}
    </div>
  );
};

export default BookDetailsStock;
