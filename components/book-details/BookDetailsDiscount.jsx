import React from "react";

const BookDetailsDiscount = ({ book, login, isEditing, register }) => {
  const discount = book?.descuento
    ? (book.descuento / 100) * book.precio
    : null;

  return (
    <div className="mt-8 text-right">
      {login.usuario?.admin && isEditing ? (
        <div className="inline-flex flex-col items-start">
          <label className="text-slate-800 dark:text-slate-100 transition-colors">Precio</label>
          <input
            {...register("price")}
            defaultValue={book.precio}
            className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors"
            type="number"
          />
          <label className="text-slate-800 dark:text-slate-100 transition-colors">Descuento</label>
          <input
            {...register("discount")}
            defaultValue={book.descuento}
            className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors"
            type="number"
          />
        </div>
      ) : (
        <div>
          {discount && (
            <p className="text-xl text-emerald-600 dark:text-emerald-400 transition-colors">
              {(book.precio - discount).toFixed(2)}
            </p>
          )}
          <div className="flex gap-2 justify-end items-center">
            <p
              className={`font-bold text-xl text-slate-800 dark:text-slate-100 transition-colors ${
                discount ? "line-through text-base" : ""
              }`}
            >
              {book.precio} $
            </p>
            {discount && <span className="text-white bg-red-500 dark:bg-red-600 p-1 pr-2 pl-2 transition-colors">- {book.descuento} %</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailsDiscount;
