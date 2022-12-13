import fetchSetter from "./fetchSetter";

export const getIsRated = async ({ isbn, token }) => {
  const GET_IS_RATED = `query
    {
      puntuo(isbn: "${isbn}", tokenUser: "${token}") {
        message
        success
        status
        puntuo
        compro
      }
    }`;

  const data = await fetchSetter(GET_IS_RATED);
  return data;
};
