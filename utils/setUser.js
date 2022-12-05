import { ENDPOINT } from "../config";

const setUser = () => {
    query = `query
    {
      login(correo: "errandoneagonzalo18@gmail.com",  contrasenia: "1234")
      {
        message
        success
        accessToken
        usuario {
          id
          nombre
          correo
          contrasenia
          admin
        }
      }
    }`
    
    return fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: QUERY }),
      }).then((res) => res.json());

}