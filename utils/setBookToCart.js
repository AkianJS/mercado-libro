import { ENDPOINT } from "../config";

export const setBookTocart = ({quantity, isbn, token}) => {

    const SET_BOOK_TO_CART = `mutation
    {
      agregarProducto(cantidad: ${quantity}, isbn: "${isbn}", tokenUser: "${token}") {
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
    }`
    
    return fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: SET_BOOK_TO_CART }),
      }).then((res) => res.json());
}