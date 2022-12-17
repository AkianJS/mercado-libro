import React from 'react'

const BookDetailsLanguage = ({book, login, isEditing}) => {
    return (
        <div className='mt-4 flex gap-2'>
          {login.usuario?.admin && isEditing ? (
            <>
            <p>Idioma: </p>
              <input
                defaultValue={book.idioma?.nombre}
                className="bg-gray-200 rounded-sm"
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