import fetchSetter from "./fetchSetter";

export const setOpinion = async ({comment, isbn, token}) => {
  const SET_OPINION = `mutation
    {
      opinar(comentario: ${comment}, isbn: "${isbn}", tokenUser: "${token}") {
        message
        status
        success
      }
    }`;

  const data = await fetchSetter(SET_OPINION);
  return data;
};
