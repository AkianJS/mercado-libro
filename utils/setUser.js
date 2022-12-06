import { ENDPOINT } from "../config";

export const setUser = ({name = '', email = '', password = ''} = {}) => {
  
    const SET_USER = `mutation
    {
      singUp(nombre: "${name}", correo: "${email}", contrasenia: "${password}")
      {
        message
        success
        accessToken
        usuario {
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
        body: JSON.stringify({ query: SET_USER }),
      }).then((res) => res.json());

}