import Image from "next/image";
import styles from "../styles/Home.module.css";
import BooksGrid from "../components/BooksGrid";
import Layout from "../components/layout/Layout";
import book from "../public/book-cover.webp";
import { getBooks } from "../utils/getBooks";

const Home = ({ books }) => {
  return (
    <Layout>
      <div className="w-full relative h-90vh bg-black">
        <Image
          className="object-cover h-90vh opacity-80"
          alt="prueba"
          src={book}
        />
        <div
          className={`w-3/4 h-auto xl:whitespace-pre absolute  text-white text-center uppercase top-24 max-xl:top-12 left-2/4 -translate-x-2/4 text-9xl max-sm:text-[18vw] max-lg:text-9xl xl:text-9xl ${styles.headerText}`}
        >
          <h1 className={`leading-tight`}>
            <strong>cyber </strong>
            <i>monday</i>
          </h1>
        </div>
        <h2
          className={`text-white text-center bottom-28 absolute left-2/4 -translate-x-2/4 whitespace-pre text-9xl max-sm:text-[18vw] max-lg:text-9xl ${styles.headerText2}`}
        >
          <i>
            <strong>30%</strong> OFF
          </i>
        </h2>
      </div>

      <BooksGrid withPrice={true} books={books} texth3="Ofertas" />
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await getBooks();
  const {
    data: { getLibro },
  } = res;
  const books = getLibro;
  return {
    props: {
      books,
    },
  };
}

export default Home;
