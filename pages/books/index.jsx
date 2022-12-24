import React from "react";
import Layout from "../../components/layout/Layout";
import BooksGrid from "../../components/BooksGrid";
import { getBooks } from "../../utils/getBooks";

const Books = ({ books }) => {
  return (
    <Layout title="Libros">
      <BooksGrid books={books} texth3="Libros" withPrice={true} order />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const {
    query: { query },
  } = context;

  try {
    const res = await getBooks({ title: query });
    const {
      data: { getLibro },
    } = res;
    const books = getLibro;
    return {
      props: {
        books,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error)
    const books = "";
    return {
      props: { books },
    };
  }
}

export default Books;
