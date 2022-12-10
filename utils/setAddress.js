import fetchSetter from "./fetchSetter";

export const setAddress = async ({
  token,
  name,
  address,
  additionalInfo,
  dni,
  cp,
  phone,
}) => {
  const SET_ADDRESS = `mutation
    {
      agregarDireccion(tokenUser: "${token}", 
        nombre: "${name}", 
        direccion: "${address}", 
        infoAdicional: "${additionalInfo}", 
        dni: ${dni}, 
        cp: ${cp},
        telefono: "${phone}")
        {
        message
        success
      }
    }`;

  const data = await fetchSetter(SET_ADDRESS);
  return data;
};
