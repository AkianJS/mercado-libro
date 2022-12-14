import fetchSetter from "./fetchSetter";

export const removeTheme = async ({theme}) => {
    const REMOVE_THEME = `mutation
    {
      eliminarTema(tema: "${theme}") {
        message
        status
        success
      }
    }`
    const data = fetchSetter(REMOVE_THEME)
    return data
}