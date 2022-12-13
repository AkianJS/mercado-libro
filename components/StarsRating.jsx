import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { getIsRated } from "../utils/getIsRated";

const StarsRating = ({Toast, book, login}) => {
  const [ratingState, setRatingState] = useState({puntuo: false, compro: false})
  const router = useRouter()

  useEffect(() => {
    if (login.success) {
      const getRating = async () => {
        const res = await getIsRated({
          isbn: book.isbn,
          token: login.accessToken,
        });
        const { errors, data } = res;
        console.log(res)
        if (errors || !data) return setRatingState({puntuo: false, compro: false})
        setRatingState(data?.puntuo);
      };
      
      getRating();
    }
  }, [book, login.isLoading]);

  const handleRating = (rate) => {
    console.log(rate)
  };

  console.log(book)

  return (
    <Rating
      initialValue={3.4}
      allowFraction
      readonly={ratingState.puntuo || !ratingState.compro}
      size={30}
      transition
      onClick={handleRating}
    />
  );
};

export default StarsRating;
