import fetchSetter from "./fetchSetter";

export const getThemes = async () => {
  const GET_THEMES = `query
    {
      getTemas {
        message
        success
        temas {
          id
          nombre
          url_imagen
        }
      }
    }`;

  const data = await fetchSetter(GET_THEMES);
  return data;
};
