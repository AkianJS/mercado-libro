import fetchSetter from "./fetchSetter";

export const getSells = async () => {
  const GET_SELLS = `query
    {
      getVentas {
        message
        status
        success
        orden {
          fecha
          id
          total
          orden_detalle {
            id
            cantidad
            precio
            libro {
              isbn
              url_imagen
              titulo
              stock
              precio
            }
          }
        }
      }
    }
    `;

  const data = await fetchSetter(GET_SELLS);
  return data;
};
