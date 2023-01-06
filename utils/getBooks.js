import fetchSetter from "./fetchSetter";

export const getBooks = async ({category = '', title = '', isbn = '', discount = false, author = ""} = { }) => {
  const GET_BOOKS = `query
  {
    getLibro(categoria: "${category}", titulo: "${title}", isbn: "${isbn}", descuento: ${discount}, autor: "${author}")
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
        puntuacion_media
        idioma {
          nombre
        }
        editorial {
          nombre
        }
        tema {
          nombre
        }
        autor {
          nombre
        }
        autor {
          nombre
        }
        opinion {
          comentario
          usuario {
            id
            nombre
          }
        }
        puntuacion {
          usuario {
            nombre
          }
        }
      }
    }
  }	`;

  const data = await fetchSetter(GET_BOOKS);
  return data;
};
