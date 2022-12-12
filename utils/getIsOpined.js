import fetchSetter from "./fetchSetter";

export const getIsOpined = async({isbn, token}) => {
    const GET_IS_OPINED = `query
    {
      opino(isbn: "${isbn}", tokenUser: "${token}") {
        message
        status
        success
        opino
      }
    }
    `
    
    const data = await fetchSetter(GET_IS_OPINED);
    return data;
}