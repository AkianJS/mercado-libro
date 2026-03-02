import styles from "../styles/BooksGrid.module.css";
import BookCard from "./BookCard";
import BookAddCard from "./BookAddCard";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import collect from 'collect.js';

const BooksGrid = ({ texth3, books, withPrice = false, order = false }) => {
  const {
    state: { login },
  } = useContext(AppContext);
  const [checked, setChecked] = useState(0);
  const [sortedBooks, setSortedBooks] = useState(collect(books))

  useEffect(() => {
    setSortedBooks(collect(books))
  },[books])
  // Logica del ordenamiento mas control para saber cual boton se oprimio
  const handleOrderAZ = () => {
    setChecked(1);
    setSortedBooks(sortedBooks.sortBy("titulo"))
  };

  const handleOrderZA = () => {
    setChecked(2);
    setSortedBooks(sortedBooks.sortByDesc("titulo"))
  };

  const handleOrderLowestPrice = () => {
    setChecked(3);
    setSortedBooks(sortedBooks.sortBy("precio"))
  };

  const handleOrderHighgestPrice = () => {
    setChecked(4);
    setSortedBooks(sortedBooks.sortByDesc("precio"))
  };

  const sortBtnBase = "text-sm font-medium py-1.5 px-3 rounded-lg transition-all duration-200 cursor-pointer";
  const sortBtnActive = "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-200 dark:ring-indigo-700";
  const sortBtnInactive = "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-700 hover:ring-indigo-300 dark:hover:ring-indigo-600";

  return (
    <section className="mt-16 max-w-screen-xl m-auto p-4">
      <h3 className="mb-10 ml-2 uppercase font-bold text-3xl tracking-wide text-slate-800 dark:text-slate-100">{texth3}</h3>
      {order && (
        <div className="mb-8 flex gap-2 flex-wrap items-center">
          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-1">Ordenar por: </h4>
          <button
            className={`${sortBtnBase} ${checked === 1 ? sortBtnActive : sortBtnInactive}`}
            onClick={handleOrderAZ}
          >
            A-Z
          </button>

          <button
            className={`${sortBtnBase} ${checked === 2 ? sortBtnActive : sortBtnInactive}`}
            onClick={handleOrderZA}
          >
            Z-A
          </button>

          <button
            className={`${sortBtnBase} ${checked === 3 ? sortBtnActive : sortBtnInactive}`}
            onClick={handleOrderLowestPrice}
          >
            Menor Precio
          </button>
          <button
            className={`${sortBtnBase} ${checked === 4 ? sortBtnActive : sortBtnInactive}`}
            onClick={handleOrderHighgestPrice}
          >
            Mayor Precio
          </button>
        </div>
      )}

      <ul className={`${styles.grid} w-full`}>
        {login.usuario?.admin && <BookAddCard />}
        {sortedBooks.map((item) => (
          <BookCard withPrice={withPrice} book={item} key={item.isbn}>
            {" "}
          </BookCard>
        ))}
      </ul>
    </section>
  );
};

export default BooksGrid;
