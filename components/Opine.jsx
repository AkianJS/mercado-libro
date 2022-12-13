import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { getIsOpined } from "../utils/getIsOpined";
import { setOpinion } from "../utils/setOpinion";
import OpinedCard from "./OpinedCard";
import Loader from "./ui/Loader";

const Opine = ({ book, login, Toast, isLoading }) => {
  const [isOpined, setIsOpined] = useState(false);
  const textAreaRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if (login.success) {
      const getOpinion = async () => {
        const res = await getIsOpined({
          isbn: book.isbn,
          token: login.accessToken,
        });
        const { errors, data } = res;
        if (errors || !data) setIsOpined(true);
        setIsOpined(data.opino?.opino);
      };
      getOpinion();
    }
  }, [book, isLoading]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let value = JSON.stringify(textAreaRef.current.value);

    const res = await setOpinion({
      comment: value,
      isbn: book.isbn,
      token: login.accessToken,
    });
    const { errors, data } = res;
    if (errors || !data)
      return Toast.fire({
        icon: "error",
        title: `Tu comentario no se pudo agregar`,
      });
    else if (data.opinar?.success) {
      router.replace(router.asPath);
      return Toast.fire({
        icon: "success",
        title: `Comentario agregado!`,
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  return (
    <section className="max-w-screen-xl m-auto">
      {!isOpined && (
        <>
          <h4 className="text-lg text-center font-bold">
            Dejanos tu opinión debajo!
          </h4>

          <form onSubmit={handleOnSubmit}>
            <div className="mr-8 ml-8 mt-4 flex flex-col items-center">
              <textarea
                ref={textAreaRef}
                rows="4"
                cols="50"
                className={`bg-gray-200 border-2 w-full max-w-lg border-black rounded-sm p-2 outline-none`}
                type="text"
              ></textarea>
              <button
                type="submit"
                className="bg-teal-600 text-white mt-4 ml-4 p-1 pl-2 pr-2 rounded-sm flex items-center gap-2 hover:scale-105 ease-linear duration-100"
              >
                Opinar <FaAngleDoubleDown />
              </button>
            </div>
          </form>
        </>
      )}
      {book?.opinion.length > 0 ? <h3 className="max-w-2xl m-auto font-bold text-xl">Opiniones</h3> : undefined}
      {book?.opinion?.map((item) => (
        <OpinedCard key={item?.usuario?.id} book={item} />
      ))}
    </section>
  );
};

export default Opine;
