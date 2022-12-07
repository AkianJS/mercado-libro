import { ENDPOINT } from "../config";

export const removeFav = ({isbn, token}) => {

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
    }`
    
    return fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: REMOVE_FAV }),
      }).then((res) => res.json());
}