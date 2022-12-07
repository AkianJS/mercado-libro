import React from 'react'
import BooksGrid from '../../components/BooksGrid'
import Layout from '../../components/layout/Layout'
import { getBooks } from '../../utils/getBooks'

const CategoryBooks = ({books, query}) => {
  return (
    <Layout>

    <section>
        <BooksGrid books={books} texth3={query}/>
    </section>
    </Layout>
  )
}

export async function getServerSideProps(context) {
    const { query: { query } } = context;
  
    const res = await getBooks({category: query})
    const {
      data: { getLibro },
    } = res;
    const books = getLibro;
    return {
      props: {
        books,
        query
      },
    };
  }

export default CategoryBooks