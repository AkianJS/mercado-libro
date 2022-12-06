import Image from "next/image";
import React from "react";

const CartBookCard = ({ cartBook }) => {
  return (
    <div className="">
      <h3>{cartBook.isbn}</h3>
      <Image
        alt={cartBook.titulo}
        width="200"
        height="300"
        src={cartBook.url_imagen}
      />
    </div>
  );
};

export default CartBookCard;
