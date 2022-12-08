import fetchSetter from "./fetchSetter";

export const removeFav = async ({ isbn, token }) => {
  const REMOVE_FAV = `mutation
    {
      removeFav(isbn: "${isbn}", tokenUser: "${token}") {
        message
        success
        accessToken
        usuario {
          favorito {
            isbn
          }
        }
      }
    }`;

  const data = await fetchSetter(REMOVE_FAV);
  return data;
};
