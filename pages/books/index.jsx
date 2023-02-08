import React from "react";
import Layout from "../../components/layout/Layout";
import BooksGrid from "../../components/BooksGrid";
import { getBooks } from "../../utils/getBooks";

const Books = ({ books, booksByAuthor, query }) => {

  return (
    <Layout title="Libros">
      <BooksGrid books={books} texth3="Libros" withPrice order />
      {query !== "" && (
        <BooksGrid books={booksByAuthor.libro} texth3="Autor" withPrice order />
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({query}) => {

  try {
    const res = await getBooks({ title: query.query || '' });
    const {
      data: {
        getLibro: { libro },
      },
    } = res;
    const books = libro;
    const resAuthor = await getBooks({ author: query });
    const booksByAuthor = resAuthor?.data?.getLibro || [];
    return {
      props: {
        books,
        booksByAuthor,
        query: query?.query ?? "",
      },
    };
  } catch (error) {
    const books = [];
    return {
      props: { books },
    };
  }
}

export default Books;
