import fetchSetter from "./fetchSetter";

export const setTheme = async ({ theme, imageUrl, originalTheme = '' }) => {
  const SET_THEME = `mutation
    {
      insertTema(tema: "${theme}",tema_original: "${originalTheme}", url_imagen: "${imageUrl}") {
        message
        status
        success
      }
    }`;
  const data = await fetchSetter(SET_THEME);
  return data;
};
