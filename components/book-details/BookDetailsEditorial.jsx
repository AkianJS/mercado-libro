import React from 'react'

const BookDetailsEditorial = ({book, login, isEditing, register}) => {
    return (
        <div className='mt-4 flex gap-2'>
          {login.usuario?.admin && isEditing ? (
            <>
            <p>Editorial: </p>
              <input
              {...register("editorial")}
                defaultValue={book.editorial?.nombre}
                className="bg-gray-200 rounded-sm"
                rows="15"
              />
            </>
          ) : (
            <p className="text-gray-600">Editorial: {book.editorial?.nombre}</p>
          )}
        </div>
      );
    };

export default BookDetailsEditorial