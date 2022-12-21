import styles from "../styles/BooksGrid.module.css";
import BookCard from "./BookCard";
import BookAddCard from "./BookAddCard";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";

const BooksGrid = ({ texth3, books, withPrice = false, order = false }) => {
  const {
    state: { login },
  } = useContext(AppContext);
  const [libro, setLibro] = useState(books.libro);
  const [checked, setChecked] = useState(0);
  const router = useRouter();

  // Lógica del ordenamiento más control para saber cuál botón se oprimió
  const handleOrderAZ = () => {
    setLibro(libro.sort((prev, curr) => prev.titulo > curr.titulo));
    setChecked(1);
    router.push(router.asPath);
  };

  const handleOrderZA = () => {
    setChecked(2);
    setLibro(libro.sort((prev, curr) => prev.titulo < curr.titulo));
    router.push(router.asPath);
  };

  const handleOrderLowestPrice = () => {
    setChecked(3);
    setLibro(libro.sort((prev, curr) => prev.precio > curr.precio));
    router.push(router.asPath);
  };

  const handleOrderHighgestPrice = () => {
    setChecked(4);
    setLibro(libro.sort((prev, curr) => prev.precio < curr.precio));
    router.push(router.asPath);
  };

  return (
    <section className="mt-20 max-w-screen-xl m-auto pl-2 pr-2">
      <h3 className="mb-12 ml-4 uppercase bold text-4xl">{texth3}</h3>
      <div className="mb-4 flex gap-2 flex-wrap items-center">
        <h4>Ordenar por: </h4>
        <button
          className={`text-white pt-1 pb-1 pr-2 pl-2 rounded-md duration-300 ${
            checked === 1 ? "bg-gray-400" : "bg-black"
          } `}
          onClick={handleOrderAZ}
        >
          A-Z
        </button>

        <button
          className={`text-white pt-1 pb-1 pr-2 pl-2 rounded-md duration-300 ${
            checked === 2 ? "bg-gray-400" : "bg-black"
          } `}
          onClick={handleOrderZA}
        >
          Z-A
        </button>

        <button
          className={`text-white pt-1 pb-1 pr-2 pl-2 rounded-md duration-300 ${
            checked === 3 ? "bg-gray-400" : "bg-black"
          } `}
          onClick={handleOrderLowestPrice}
        >
          Menor Precio
        </button>
        <button
          className={`text-white pt-1 pb-1 pr-2 pl-2 rounded-md duration-300 ${
            checked === 4 ? "bg-gray-400" : "bg-black"
          } `}
          onClick={handleOrderHighgestPrice}
        >
          Mayor Precio
        </button>
      </div>

      <ul className={`${styles.grid} w-full`}>
        {login.usuario?.admin && <BookAddCard />}
        {libro?.map((item) => (
          <BookCard withPrice={withPrice} book={item} key={item.isbn}>
            {" "}
          </BookCard>
        ))}
      </ul>
    </section>
  );
};

export default BooksGrid;
