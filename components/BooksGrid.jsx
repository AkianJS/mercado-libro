import styles from "../styles/BooksGrid.module.css";
import BookCard from "./BookCard";
import BookAddCard from "./BookAddCard";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const BooksGrid = ({ texth3, books, withPrice = false, order = false }) => {
  const {
    state: { login },
  } = useContext(AppContext);
  const [checked, setChecked] = useState(0);

  // Lógica del ordenamiento más control para saber cuál botón se oprimió
  const handleOrderAZ = () => {
    setChecked(1);
    books.sort((prev, curr) => prev.titulo > curr.titulo)
  };

  const handleOrderZA = () => {
    setChecked(2);
    books.sort((prev, curr) => prev.titulo < curr.titulo);
  };

  const handleOrderLowestPrice = () => {
    setChecked(3);
    books.sort((prev, curr) => prev.precio > curr.precio);
  };

  const handleOrderHighgestPrice = () => {
    setChecked(4);
    books.sort((prev, curr) => prev.precio < curr.precio)
  };

  return (
    <section className="mt-20 max-w-screen-xl m-auto p-2">
      <h3 className="mb-12 ml-4 uppercase bold text-4xl">{texth3}</h3>
      {order && (
        <div className="mb-8 flex gap-2 flex-wrap items-center">
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
      )}

      <ul className={`${styles.grid} w-full`}>
        {login.usuario?.admin && <BookAddCard />}
        {books?.map((item) => (
          <BookCard withPrice={withPrice} book={item} key={item.isbn}>
            {" "}
          </BookCard>
        ))}
      </ul>
    </section>
  );
};

export default BooksGrid;
