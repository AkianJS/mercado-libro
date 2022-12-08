import fetchSetter from "./fetchSetter";

export const removeAllFromCart = async ({ isbn, token }) => {
  const REMOVE_ALL_FROM_CART = `mutation
    {
      eliminarProducto(isbn: "${isbn}", tokenUser: "${token}") {
        message
        success
        accessToken
        usuario {
          carrito {
            cantidad
            libro {
              isbn
              titulo
            }
          }
        }
      }
    }`;

  const data = await fetchSetter(REMOVE_ALL_FROM_CART);
  return data;
};
