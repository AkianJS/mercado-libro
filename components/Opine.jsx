import React, { useEffect, useState } from "react";
import { getIsOpined } from "../utils/getIsOpined";

const Opine = ({ book, login }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpined, setIsOpined] = useState(true);
  console.log(login);
  useEffect(() => {
    if (login.success) {
      const getOpinion = async () => {
        const res = await getIsOpined({
          isbn: book.isbn,
          token: login.accessToken,
        });
        const { errors, data } = res;
        if (errors || !data) return setIsOpined(true);
        else if (data.opino?.success) setIsOpined(data.opino?.opino);
      };
      getOpinion();
    }
  }, [book?.opinion]);
  console.log(isOpined);

  return (
    <section className="max-w-screen-xl m-auto">
      {!isOpined && (
        <>
          <h4>Dejanos tu opinión debajo!</h4>
          <p></p>
        </>
      )}
    </section>
  );
};

export default Opine;
