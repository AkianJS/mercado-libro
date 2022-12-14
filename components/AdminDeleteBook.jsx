import React, { useRef, useState } from "react";
import { removeBook } from "../utils/removeBook";
import Button from "./ui/Button";

const AdminDeleteBook = () => {
  const isbnRef = useRef();
  const [message, setMessage] = useState(null);

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    let value = isbnRef.current.value;
    const res = await removeBook({ isbn: value });
    console.log(res)
    const { errors, data } = res;
    if ((errors || !data)) setMessage("Error del servidor");
    else if (data.eliminarLibro?.success) setMessage("Libro eliminado");
    else setMessage("No se pudo encontrar el libro");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="max-w-2xl m-auto grid grid-cols-2 gap-2">
        <div>
          <label className="uppercase text-sm">ISBN del libro a borrar</label>
          <input
            ref={isbnRef}
            className={`bg-gray-200 border-2 border-black rounded-sm w-full p-2 outline-none`}
            type="text"
          />
        </div>
        <div></div>
        <div className="mt-auto">
          <Button text="Eliminar" type="submit" />
        </div>
      </div>
        {message && <p className="text-center">{message}</p>}
    </form>
  );
};

export default AdminDeleteBook;
