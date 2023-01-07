import fetchSetter from "./fetchSetter";

export const setPassRecovery = async ({ email }) => {
  const PASS_RECOVERY = `mutation
    {
      recuperarContrasenia(correo: "${email}") {
        message
        status
        success
      }
    } 
    `;
  const data = await fetchSetter(PASS_RECOVERY);
  return data;
};
