import fetchSetter from "./fetchSetter";

export async function updateUser({ name, token, pass, email }) {
  const UPDATE_USER = `
    mutation
{
  updateUsuario(tokenUser: "${token}", contrasenia: "${pass}") {
    message
    status
    success
  }
} 
`;

  const data = await fetchSetter(UPDATE_USER);
  return data;
}
