import { ENDPOINT } from "../config";

export const setBook = ({isbn, image, title, editionDate, 
price, stock, description, entryDate, discount, language, editorial,
author, themes}) => {
    console.table(isbn, image, title, editionDate, price, stock, description, entryDate, discount, language, editorial
        , author, themes)

    const SET_BOOK = `mutation
    {
        insertLibro(isbn: "${isbn}",
                    imagen: "${image}",
                    titulo: "${title}",
                    fecha_edicion: "${editionDate}",
                    precio: ${price},
                    stock: ${stock},
                    descripcion: "${description}",
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
    
    return fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          
        },
        body: JSON.stringify({ query: SET_BOOK }),
      }).then((res) => res.json());
}