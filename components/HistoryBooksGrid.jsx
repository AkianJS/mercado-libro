import styles from "../styles/BooksGrid.module.css";
import BookCard from "./BookCard";

const HistoryBooksGrid = ({ order }) => {
  return (
    <section className="mt-12 max-w-screen-xl m-auto">
      <p className="text-center font-serif">
        Compra de la fecha <i> {order.fecha} </i> por{" "}
        <span className="text-emerald-600">{order.total}$ </span>
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
      <hr className="" />
    </section>
  );
};

export default HistoryBooksGrid;
