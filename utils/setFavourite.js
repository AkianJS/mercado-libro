import fetchSetter from "./fetchSetter";

export const setFav = async({isbn, token}) => {

    const SET_FAVOURITE = `mutation
    {
      insertFav(isbn: "${isbn}", tokenUser: "${token}") {
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
    
    const data = await fetchSetter(SET_FAVOURITE);
    return data;
}