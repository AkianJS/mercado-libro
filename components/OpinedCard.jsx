import React from "react";

const OpinedCard = ({ book }) => {
  const comentary = book.comentario?.split("\n");
  return (
    <div className="m-auto max-w-xl flex flex-col items-center">
      <h3 className="ml-auto mr-2 text-lg text-emerald-600">{book.usuario?.nombre}</h3>
      <div className="flex flex-col items-center border-2 border-black rounded-md p-4 w-full">
        {comentary.map((item) => (
          <p className="italic" key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default OpinedCard;
