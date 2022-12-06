import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/CategoryCard.module.css"

const CategoryCard = ({ theme }) => {
  const router = useRouter()

  const handleGoToBooks = () => {
    router.push(`/categories/books/?query=${theme.nombre}`)
  }
  return (
    <div onClick={handleGoToBooks} className="bg-slate-600 h-56 relative rounded-md shadow-lg flex items-center justify-center overflow-hidden">
      <Image
        className="absolute"
        fill
        alt={theme.nombre}
        src={theme.url_imagen}
      />
      <h3 className={`uppercase text-5xl text-center text-white z-10 ${styles.themeTitle}`}>{theme.nombre}</h3>
    </div>
  );
};

export default CategoryCard;
