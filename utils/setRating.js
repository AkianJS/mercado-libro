import fetchSetter from "./fetchSetter";

export const setRating = async ({ rating, isbn, token }) => {
  const SET_RATING = `mutation
    {
      puntuar(puntuacion: ${rating}, isbn: "${isbn}", tokenUser: "${token}") {
        message
        status
        success
      }
    }`;

  const data = await fetchSetter(SET_RATING);
  return data
};
