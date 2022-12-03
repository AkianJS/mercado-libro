import React from "react";
import Layout from "../../components/layout/Layout";
import BooksGrid from "../../components/BooksGrid";
import { getBooks } from "../../utils/getBooks";

const Books = ({ books }) => {
  return (
    <Layout title="Libros">
      <BooksGrid books={books} texth3="Libros" />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { query: { query } } = context;

  const res = await getBooks({ title: query });
  const {
    data: { getLibros },
  } = res;
  const books = getLibros;
  return {
    props: {
      books,
    },
  };
}

export default Books;
