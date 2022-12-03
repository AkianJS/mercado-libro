export const getBooks = ({category = '', title = '', isbn = ''} = { }) => {
  const GET_BOOKS = `query
  {
    getLibros(categoria: "${category}", titulo: "${title}", isbn: "${isbn}")
    {
      message
      success
      status
      page
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
        idioma
        {
          id
          nombre
        }
        editorial
        {
          id
          nombre
        }
        autor
        {
          id
          nombre
        }
        tema
        {
          id
          nombre
        }
        opinion
        {
          usuario_libro
          comentario
          usuario
          {
            id
          }
          libro
          {
            isbn
          }
        }
        puntuacion
        {
          usuario_libro
          puntuacion
          usuario
          {
            id
          }
          libro
          {
            isbn
          }
        }
      }
    }
  }`;

  return fetch("http://localhost:3001/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: GET_BOOKS }),
  }).then((res) => res.json());
};
