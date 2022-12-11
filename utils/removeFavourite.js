import fetchSetter from "./fetchSetter";

export const removeFav = async ({ isbn, token }) => {
  const REMOVE_FAV = `mutation
    {
      removeFav(isbn: "${isbn}", tokenUser: "${token}") {
        message
        status
        success
      }
    }`;

  const data = await fetchSetter(REMOVE_FAV);
  return data;
};
