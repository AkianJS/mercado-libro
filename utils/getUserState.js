export const getUserState = ({
  email = "",
  password = "",
  token = "",
} = {}) => {

  const QUERY = `query
  {
      login(correo: "${email}", contrasenia: "${password}" , tokenUser: "${token}") {
          message
      success
      status
      accessToken
      usuario{
        id
        nombre
        correo
        contrasenia
        admin
        favorito{
          isbn
          url_imagen
          titulo
          fecha_edicion
          precio
          stock
            fecha_ingreso
          descuento
          idioma
          {
            nombre
          }
          editorial
          {
            nombre
          }
          autor
          {
            nombre
          }
          tema
          {
            nombre
          }
        }
          orden
        {
          fecha
          total
          cupon
          {
            codigo_cupon
            porc_descuento
            utilizado
          }
          direccion_entrega
          {
            id
            direccion
            infoAdicional
            dni
            telefono
            usuario
            ciudad
            {
              cp
              nombre
              provincia{
                id
                nombre
                pais
                {
                  nombre
                }
              }
            }
          }
          orden_detalle
          {
            id
            precio
            cantidad
            id_orden
            libro
            {
              isbn
            }
          }
        }
        carrito
        {
          nro_linea
          cantidad
          libro
          {
            isbn
            url_imagen
            titulo
          }
        }
      }
    }
  } `;

  return fetch("http://localhost:3001/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY }),
  }).then((res) => res.json());
};
