import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { getIsOpined } from "../utils/getIsOpined";
import { setOpinion } from "../utils/setOpinion";
import OpinedCard from "./OpinedCard";
import Loader from "./ui/Loader";

const Opine = ({ book, login, Toast, isLoading }) => {
  const [opinedState, setopinedState] = useState({opino: false, compro: false});
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
        if (errors || !data) setopinedState({opino: false, compro: false});
        setopinedState(data.opino);
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
      {!opinedState.opino && opinedState.compro && (
        <>
          <h4 className="text-lg text-center font-bold text-slate-800 dark:text-slate-100">
            Dejanos tu opinion debajo!
          </h4>

          <form onSubmit={handleOnSubmit}>
            <div className="mr-8 ml-8 mt-4 flex flex-col items-center">
              <textarea
                ref={textAreaRef}
                rows="4"
                cols="50"
                className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 w-full max-w-lg rounded-lg p-3 outline-none text-slate-800 dark:text-slate-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                type="text"
              ></textarea>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white mt-4 py-2 px-4 rounded-lg flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm"
              >
                Opinar <FaAngleDoubleDown />
              </button>
            </div>
          </form>
        </>
      )}
      {book?.opinion.length > 0 ? <h3 className="max-w-2xl m-auto font-bold text-xl text-slate-800 dark:text-slate-100 mt-4">Opiniones</h3> : undefined}
      {book?.opinion?.map((item) => (
        <OpinedCard key={item?.usuario?.id} book={item} />
      ))}
    </section>
  );
};

export default Opine;
