import { ENDPOINT } from "../config";

export const getBooks = ({category = '', title = '', isbn = ''} = { }) => {
  const GET_BOOKS = `query
  {
    getLibro(categoria: "${category}", titulo: "${title}", isbn: "${isbn}")
    {
      message
      success
      status
      page
      totalPage
      libro 
      {
        isbn
        url_imagen
        titulo
        fecha_edicion
        precio
        stock
        descripcion
        fecha_ingreso
        descuento
        editorial {
          nombre
        }
      }
    }
  }	`;

  return fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: GET_BOOKS }),
  }).then((res) => res.json());
};
