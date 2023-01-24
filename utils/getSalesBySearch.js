import fetchSetter from "./fetchSetter";

export async function getSalesBySearch({ from, to, limit, offset }) {
  const QUERY = `query
    {
      getVentas(fechaMenor: "${from}", fechaMayor: "${to}", limit: ${limit}, offset: ${offset}) {
        message
        status
        success
        page
        maxPage
        orden {
          id
          fecha
          total
          cupon {
            codigo_cupon
            porc_descuento
            utilizado
          }
          orden_detalle {
            id
            cantidad
            precio
            libro {
              isbn
              titulo
              url_imagen
              precio
            }
          }
        }
      }
    }`;

  const data = await fetchSetter(QUERY);
  return data;
}
