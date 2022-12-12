import React from "react";

const OpinedCard = ({ book }) => {
  console.log(book);
  return (
    <div className="m-4">
      <p>{book?.comentario}</p>
    </div>
  );
};

export default OpinedCard;
