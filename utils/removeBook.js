import fetchSetter from "./fetchSetter";

export const removeBook = async ({ isbn }) => {
  const REMOVE_BOOK = `mutation
    {
      eliminarLibro(isbn: "${isbn}") {
        message
        status
        success
      }
    }
    `;
  const data = fetchSetter(REMOVE_BOOK);
  return data;
};
