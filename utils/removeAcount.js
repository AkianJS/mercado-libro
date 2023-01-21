import fetchSetter from "./fetchSetter";

export async function removeAccount({ token }) {
  const REMOVE_ACCOUNT = `
    mutation
    {
    eliminarUsuario(tokenUser: "${token}") {
        message
        status
        success
     }
    }
    `;

  const data = await fetchSetter(REMOVE_ACCOUNT);

  return data;
}
