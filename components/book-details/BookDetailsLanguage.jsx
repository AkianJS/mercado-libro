import React from 'react'

const BookDetailsLanguage = ({book, login, isEditing, register}) => {
    return (
        <div className='mt-4 flex gap-2'>
          {login.usuario?.admin && isEditing ? (
            <>
            <p className="text-slate-800 dark:text-slate-100 transition-colors">Idioma: </p>
              <input
              {...register("language")}
                defaultValue={book.idioma?.nombre}
                className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition-colors"
                type="text"
              />
            </>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 transition-colors">Idioma: {book.idioma?.nombre}</p>
          )}
        </div>
      );
    };

export default BookDetailsLanguage