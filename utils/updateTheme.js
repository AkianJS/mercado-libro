import fetchSetter from "./fetchSetter";

export const updateTheme = async ({ originalTheme, theme, imageUrl }) => {
  const UPDATE_THEME = `mutation
    {
      updateTema(tema_original: "${originalTheme}", tema: "${theme}", url_imagen: "${imageUrl}") {
        message
        status
        success
      }
    }
    `;
  const data = fetchSetter(UPDATE_THEME);
  return data;
};
