import fetchSetter from "./fetchSetter";

export const setFav = async({isbn, token}) => {

    const SET_FAVOURITE = `mutation
    {
      insertFav(isbn: "${isbn}", tokenUser: "${token}")  {
        message
        status
        success
      }
    }`
    
    const data = await fetchSetter(SET_FAVOURITE);
    return data;
}