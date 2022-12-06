import { ENDPOINT } from "../config";

export const getThemes = () => {

    const GET_THEMES = `query
    {
      getTemas {
        message
        success
        temas {
          id
          nombre
          url_imagen
        }
      }
    }`
    
    return fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: GET_THEMES }),
      }).then((res) => res.json());
}