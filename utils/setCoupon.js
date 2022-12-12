import fetchSetter from "./fetchSetter";

export const setCoupon = async({couponCode, discount}) => {
    const SET_COUPON = `mutation
    {
      insertCupon(codigo_cupon: "${couponCode}", descuento: ${discount}) {
        message
        status
        success
      }
    }`

    const data = await fetchSetter(SET_COUPON);
    return data;    
}