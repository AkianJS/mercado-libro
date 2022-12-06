import { ENDPOINT } from "../config";

export const setFav = ({isbn, tokenUser}) => {

    const SET_FAVOURITE = `mutation
    {
      insertFav(isbn: "${isbn}", tokenUser: "${tokenUser}") {
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
        body: JSON.stringify({ query: SET_FAVOURITE }),
      }).then((res) => res.json());
}