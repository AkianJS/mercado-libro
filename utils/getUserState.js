import { gql, useQuery } from "@apollo/client"

export const getUserApollo =() => {
  const apolloQuery = `query getAllInfo($email: String!, $password: String!){
    Login(
      correo: $email, 
      contrasenia: $password)
    {
      mensaj,
      success,
      accessToken,
      usuario {
        id
        nombre
        correo
        contrasenia
        admin
        telefono
        orden
        {
          id
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
            calle
            numero
            piso_departamento
            dni
            id_usuario
            ciudad
            {
              cp
              nombre
              provincia{
                nombre
                pais{
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
              url_imagen
              titulo
              fecha_edicion
              precio
            }
          }
        }
      }
    }
  }`;

  return apolloQuery
}
