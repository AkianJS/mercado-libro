import fetchSetter from "./fetchSetter";

export const startPayment = async ({
  token
}) => {
  const START_PAYMENT = `mutation
  {
    realizarCompra(tokenUser: "${token}") {
      message
      success
      init_point
    }
  }`

  const data = await fetchSetter(START_PAYMENT);
  return data;
};
