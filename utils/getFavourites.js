import fetchSetter from "./fetchSetter";

export const getFavourites = async ({token}) => {
  const GET_FAVOURITES = `query {
  getFavoritos(tokenUser: "${token}") {
    message
    status
    success
    libro {
      isbn
      url_imagen
      titulo
      autor {
        nombre
      }
    }
  }
}`;

  const data = await fetchSetter(GET_FAVOURITES);
  return data;
};
