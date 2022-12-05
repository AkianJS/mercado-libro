import { ENDPOINT } from "../config"

export const getUserState = ({
  email = "",
  password = "",
  token = "",
} = {}) => {

  const QUERY = `query
  {
      login(correo: "${email}", contrasenia: "${password}" , tokenUser: "${token}") {
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
    } `;

  return fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY }),
  }).then((res) => res.json());
};
