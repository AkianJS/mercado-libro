import styles from "../styles/BooksGrid.module.css"
import BookCard from "./BookCard";

const BooksGrid = ({texth3, books}) => {

  return (
    <section className="mt-20 max-w-screen-xl m-auto">
      <h3 className="mb-12 ml-6 uppercase bold text-4xl">{texth3}</h3>
      <ul className={`${styles.grid} w-full`}>
        {books?.libro?.map((item) => (
          <BookCard book={item} key={item.isbn}>
            {" "}
          </BookCard>
        ))}
      </ul>
    </section>
  );
};

export default BooksGrid;
