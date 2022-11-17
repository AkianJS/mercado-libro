import React from 'react'
import { useRouter } from 'next/router'
import books from "../../books.json"

const Book = () => {
  const router = useRouter()
  const { isbn } = router.query
  const book = books.find(item => item.isbn === isbn)
  console.log(book)
  return (
    <div>
      {book.title}
      <br />
      {book.authors}
      <br />
      {book.categories}
      <br />
      {book.longDescription}
    </div>
  )
}

export default Book