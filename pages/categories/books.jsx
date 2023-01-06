import React from "react";
import BooksGrid from "../../components/BooksGrid";
import Layout from "../../components/layout/Layout";
import { getBooks } from "../../utils/getBooks";

const CategoryBooks = ({ books, query }) => {
  return (
    <Layout>
      <section>
        <BooksGrid books={books} texth3={query} withPrice={true} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const {
    query: { query },
  } = context;

  try {
    const res = await getBooks({ category: query });
    const {
      data: {
        getLibro: { libro },
      },
    } = res;
    const books = libro;
    return {
      props: {
        books,
        query,
      },
    };
  } catch (error) {
    const books = [];
    return {
      props: {
        books,
        query,
      },
    };
  }
}

export default CategoryBooks;
