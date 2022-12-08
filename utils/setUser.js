import fetchSetter from "./fetchSetter";

export const setUser = async({name = '', email = '', password = ''} = {}) => {
  
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
    
    const data = await fetchSetter(SET_USER);
    return data;
}