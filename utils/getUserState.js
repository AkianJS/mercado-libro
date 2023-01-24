import fetchSetter from "./fetchSetter";

export const getUserState = async ({
  email = "",
  password = "",
  token = "",
  name = ""
} = {}) => {
  const QUERY = `query
  {
      login(nombre: "${name}" correo: "${email}", contrasenia: "${password}" , tokenUser: "${token}") {
        message
        success
        accessToken
        usuario {
          nombre
          correo
          contrasenia
          admin
          registroRedSocial
          direccion {
            direccion
            nombre
            infoAdicional
            dni
            telefono
            ciudad {
              cp
            }
          }
          notificacion {
            id
            mensaje
          }
          carrito {
            cupon {
              codigo_cupon
              porc_descuento
              utilizado
            }
            items{
              nro_linea
              cantidad
              libro {
                isbn
                url_imagen
                titulo
                fecha_edicion
                precio
                stock
                descripcion
                descuento
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
              }
            }
          }
          favorito {
            isbn
            titulo
            precio
            url_imagen
          }
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
                url_imagen
                titulo
                precio
                stock
                autor {
                  nombre
                }
              }
            }
          }
        } 
      }
    }`;
  const data = await fetchSetter(QUERY);
  return data;
};
