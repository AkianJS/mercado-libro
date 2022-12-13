import fetchSetter from "./fetchSetter";

export const setCouponToUser = async ({couponCode, token}) => {
    const SET_COUPON_TO_USER = `mutation
    {
      agregarCupon(codigo_cupon: "${couponCode}", tokenUser: "${token}") {
        message
        success
        cupon {
          codigo_cupon
          porc_descuento
          utilizado
        }
      }
    }
    `

    const data = await fetchSetter(SET_COUPON_TO_USER)
    return data
}