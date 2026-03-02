import React from 'react'

const BookDetailsEditorial = ({book, login, isEditing, register}) => {
    return (
        <div className='mt-4 flex gap-2'>
          {login.usuario?.admin && isEditing ? (
            <>
            <p className="text-slate-800 dark:text-slate-100 transition-colors">Editorial: </p>
              <input
              {...register("editorial")}
                defaultValue={book.editorial?.nombre}
                className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors"
                rows="15"
              />
            </>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 transition-colors">Editorial: {book.editorial?.nombre}</p>
          )}
        </div>
      );
    };

export default BookDetailsEditorial