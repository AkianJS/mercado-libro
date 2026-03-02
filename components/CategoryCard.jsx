import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";
import AppContext from "../context/AppContext";
import styles from "../styles/CategoryCard.module.css";
import { removeTheme } from "../utils/removeTheme";
import CategoryAddCard from "./CategoryAddCard";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

const CategoryCard = ({ theme }) => {
  const {
    state: { login },
  } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleGoToBooks = () => {
    router.push(`/categories/books/?query=${theme.nombre}`);
  };

  const handleRemoveCategory = async () => {
    const res = await removeTheme({ theme: theme.nombre });
    const { errors, data } = res;
    if (errors || !data)
      return Swal.fire({
        title: "Error",
        text: "No se pudo borrar la categoria, intente mas tarde",
        icon: "error",
      });
    else if (data.eliminarTema?.success) {
      Swal.fire({
        title: "Exito",
        text: "Categoria eliminada",
        icon: "success",
      });
      router.reload();
    }
  };

  return (
    <div>
      {isEditing ? (
        <CategoryAddCard
          bookImage={theme.url_imagen}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          originalTheme={theme.nombre}
        />
      ) : (
        <div className="bg-slate-700 dark:bg-slate-800 h-56 relative rounded-xl shadow-lg flex items-center justify-center overflow-hidden hover:opacity-90 cursor-pointer group transition-all duration-200">
          <Image
            onClick={handleGoToBooks}
            className="absolute object-cover group-hover:scale-105 transition-transform duration-300"
            fill
            sizes="16rem"
            alt={theme.nombre}
            src={theme.url_imagen}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          {login.usuario?.admin && (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="absolute top-2 right-2 text-2xl text-white z-10 hover:text-red-400 transition-colors"
              >
                <FaTrash />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-2 left-2 text-2xl text-white z-10 hover:text-indigo-400 transition-colors"
              >
                <FaEdit />
              </button>
            </>
          )}
          <h3
          onClick={handleGoToBooks}
            className={`uppercase text-4xl text-center text-white z-10 font-bold drop-shadow-lg ${styles.themeTitle}`}
          >
            {theme.nombre}
          </h3>
          <Modal show={showModal}>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl flex flex-col gap-3 border border-slate-200 dark:border-slate-700">
              <h4 className="text-slate-800 dark:text-slate-100">Esta seguro de eliminar categoria: {theme.nombre}?</h4>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  background="rgb(239 68 68)"
                  handleClick={handleRemoveCategory}
                >
                  Eliminar
                </Button>
                <Button handleClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
