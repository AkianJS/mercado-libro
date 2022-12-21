import React from "react";

const BookDetailsDiscount = ({ book, login, isEditing, register }) => {
  const discount = book?.descuento
    ? (book.descuento / 100) * book.precio
    : null;

  return (
    <div className="mt-8 text-right">
      {login.usuario?.admin && isEditing ? (
        <div className="inline-flex flex-col items-start">
          <label>Precio</label>
          <input
            {...register("price")}
            defaultValue={book.precio}
            className="bg-gray-200 rounded-sm outline-none"
            type="number"
          />
          <label>Descuento</label>
          <input
            {...register("discount")}
            defaultValue={book.descuento}
            className="bg-gray-200 rounded-sm outline-none"
            type="number"
          />
        </div>
      ) : (
        <div>
          {discount && (
            <p className="text-xl text-emerald-600">
              {(book.precio - discount).toFixed(2)}
            </p>
          )}
          <div className="flex gap-2 justify-end items-center">
            <p
              className={`font-bold text-xl ${
                discount ? "line-through text-base" : ""
              }`}
            >
              {book.precio} $
            </p>
            {discount && <span className="text-white bg-red-600 p-1 pr-2 pl-2">- {book.descuento} %</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailsDiscount;
