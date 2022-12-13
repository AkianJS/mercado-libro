import fetchSetter from "./fetchSetter";

export const setBook = async({isbn, image, title, editionDate, 
price, stock, description, entryDate, discount, language, editorial,
author, themes}) => {

    const SET_BOOK = `mutation
    {
        insertLibro(isbn: "${isbn}",
                    imagen: "${image}",
                    titulo: "${title}",
                    fecha_edicion: "${editionDate}",
                    precio: ${price},
                    stock: ${stock},
                    descripcion: ${description},
                    fecha_ingreso: "${entryDate}",
                    descuento: ${discount},
                    idioma: "${language}",
                    editorial: "${editorial}",
                    autor: ${author},
                    tema: ${themes}
                  )
      {
          message
          success
          status
      }
    }`
    
    const data = await fetchSetter(SET_BOOK);
    return data;
}