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
        text: "No se pudo borrar la categoría, intente más tarde",
        icon: "error",
      });
    else if (data.eliminarTema?.success) {
      Swal.fire({
        title: "Éxito",
        text: "Categoría eliminada",
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
        <div className="bg-slate-600 h-56 relative rounded-md shadow-lg flex items-center justify-center overflow-hidden hover:opacity-90 cursor-pointer">
          <Image
            onClick={handleGoToBooks}
            className="absolute"
            fill
            sizes="15rem"
            alt={theme.nombre}
            src={theme.url_imagen}
          />
          {login.usuario?.admin && (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="absolute top-2 right-2 text-3xl text-white"
              >
                <FaTrash className="stroke-[1rem] stroke-black" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-2 left-2 text-3xl text-white"
              >
                <FaEdit className="stroke-[1rem] stroke-black" />
              </button>
            </>
          )}
          <h3
            className={`uppercase text-5xl text-center text-white z-10 ${styles.themeTitle}`}
          >
            {theme.nombre}
          </h3>
          <Modal show={showModal}>
            <div className="bg-white p-4 rounded-lg flex flex-col gap-2">
              <h4>Está seguro de eliminar categoria: {theme.nombre}?</h4>
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
