import fetchSetter from "./fetchSetter";

export const getCities = async () => {
  const GET_CITIES = `query
  {
    getCiudades {
      message
      status
      success
      ciudad {
        cp
        nombre
      }
    }
  }	`;

  const data = await fetchSetter(GET_CITIES);
  return data;
};
