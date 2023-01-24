import fetchSetter from "./fetchSetter";

export async function removeCoupon({ couponCode }) {
  const REMOVE_COUPON = `mutation
    {
      eliminarCupon(codigo_cupon: "${couponCode}") {
        message
        status
        success
      }
    }`;

  const data = await fetchSetter(REMOVE_COUPON);
  return data;
}
