import fetchSetter from "./fetchSetter";

export default async function getCoupons({ limit, offset }) {
  const GET_COUPONS = `query
  {
    getCupones(limit: ${limit}, offset: ${offset}) {
      message
      status
      success
      maxPage
      page
      cupones {
        codigo_cupon
        porc_descuento
        utilizado
      }
    }
  } 
   `;
  const data = await fetchSetter(GET_COUPONS);
  return data;
}
