import fetchSetter from "./fetchSetter";

export const setBookTocart = async ({ quantity, isbn, token }) => {
  const SET_BOOK_TO_CART = `mutation
    {
      agregarProducto(cantidad: ${quantity}, isbn: "${isbn}", tokenUser: "${token}") {
        message
        status
        success
      }
    }}`;

  const data = await fetchSetter(SET_BOOK_TO_CART);
  return data;
};
