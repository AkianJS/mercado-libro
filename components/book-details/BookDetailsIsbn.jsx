import React from 'react'

const BookDetailsIsbn = ({book}) => {
  return (
    <p className='mt-4 text-slate-500 dark:text-slate-400 transition-colors'>ISBN: {book.isbn}</p>
  )
}

export default BookDetailsIsbn