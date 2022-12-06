import Image from "next/image";
import React from "react";
import styles from "../styles/CategoryCard.module.css"

const CategoryCard = ({ theme }) => {
  return (
    <div className="bg-slate-600 h-56 relative rounded-md shadow-lg flex items-center justify-center overflow-hidden">
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
