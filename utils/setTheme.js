import fetchSetter from "./fetchSetter";

export const setTheme = async ({ theme, imageUrl }) => {
  const SET_THEME = `mutation
    {
      insertTema(tema: "${theme}", url_imagen: "${imageUrl}") {
        message
        status
        success
      }
    }`;
  const data = await fetchSetter(SET_THEME);
  return data;
};
