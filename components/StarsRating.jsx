import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { getIsRated } from "../utils/getIsRated";
import { setRating } from "../utils/setRating";

const StarsRating = ({ Toast, book, login }) => {
  const [ratingState, setRatingState] = useState({
    puntuo: false,
    compro: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (login.success) {
      const getRating = async () => {
        const res = await getIsRated({
          isbn: book.isbn,
          token: login.accessToken,
        });
        const { errors, data } = res;
        if (errors || !data)
          return setRatingState({ puntuo: false, compro: false });
        setRatingState(data?.puntuo);
      };

      getRating();
    }
  }, [book, login.isLoading]);

  const handleRating = async (rate) => {
    const res = await setRating({
      isbn: book.isbn,
      token: login.accessToken,
      rating: rate,
    });
    const { errors, data } = res;
    if (errors || !data)
      Toast.fire({
        icon: "error",
        title: `Fallo al puntuar`,
      });
    else {
      Toast.fire({
        icon: "success",
        title: `${book.titulo} puntuado!`,
      });
      router.push(router.asPath);
    }
  };

  return (
    <Rating
      initialValue={book.puntuacion_media}
      allowFraction
      readonly={ratingState.puntuo || !ratingState.compro}
      size={30}
      transition
      onClick={handleRating}
    />
  );
};

export default StarsRating;
