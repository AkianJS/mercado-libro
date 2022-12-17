import React from 'react'

const BookDetailsStock = ({book, login, isEditing}) => {
    return (
        <div className='mt-4 flex gap-2'>
          {login.usuario?.admin && isEditing ? (
            <>
            <p>Stock: </p>
              <input
                defaultValue={book.stock}
                className="bg-gray-200 rounded-sm"
                type="number"
              />
            </>
          ) : (
            <p className="mt-6 text-gray-600 text-sm uppercase">
            {book.stock > 0 ? (
              `${book.stock} ejemplares disponibles`
            ) : (
              <span className="text-red-500">Ningun ejemplar disponible</span>
            )}
          </p>
          )}
        </div>
      );
    };

export default BookDetailsStock