import fetchSetter from "./fetchSetter";

export const removeNotification = async ({ id }) => {
  const REMOVE_NOTIFICATION = `mutation
  {
    eliminarNotificacion(id: ${id}) {
      message
      status
      success
    }
  }`;

  const data = await fetchSetter(REMOVE_NOTIFICATION);
  return data;
};
