import React from 'react'

const BookDetailsLanguage = ({book, login, isEditing, register}) => {
    return (
        <div className='mt-4 flex gap-2'>
          {login.usuario?.admin && isEditing ? (
            <>
            <p>Idioma: </p>
              <input
              {...register("language")}
                defaultValue={book.idioma?.nombre}
                className="p-1 bg-gray-200 rounded-sm"
                type="text"
              />
            </>
          ) : (
            <p className="text-gray-600">Idioma: {book.idioma?.nombre}</p>
          )}
        </div>
      );
    };

export default BookDetailsLanguage