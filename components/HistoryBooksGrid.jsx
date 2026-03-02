import styles from "../styles/BooksGrid.module.css";
import BookCard from "./BookCard";

const HistoryBooksGrid = ({ order }) => {
  return (
    <section className="mt-12 max-w-screen-xl m-auto">
      <p className="text-center font-serif text-slate-700 dark:text-slate-300">
        Compra de la fecha <i> {order.fecha} </i> por{" "}
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{order.total}$ </span>
      </p>{" "}
      <br /> <br />
      <ul className={`${styles.grid} w-full`}>
        {order?.orden_detalle?.map((item) => (
          <BookCard
            book={item.libro}
            key={item.libro.isbn}
            quantity={item.cantidad}
          >
            {" "}
          </BookCard>
        ))}
      </ul>
      <br /> <br />
      <hr className="border-slate-200 dark:border-slate-700" />
    </section>
  );
};

export default HistoryBooksGrid;
