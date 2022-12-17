import React from 'react'

const BookDetailsIsbn = ({book}) => {
  return (
    <p className='mt-4 text-gray-600'>ISBN: {book.isbn}</p>
  )
}

export default BookDetailsIsbn