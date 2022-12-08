import fetchSetter from "./fetchSetter";

export const removeOneFromCart = async ({ quantity, isbn, token }) => {
  const REMOVE_ONE_FROM_CART = `mutation
    {
      quitarProducto(cantidad: ${quantity}, isbn: "${isbn}", tokenUser: "${token}") {
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

  const data = await fetchSetter(REMOVE_ONE_FROM_CART);
  return data;
};
