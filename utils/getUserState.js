import { ENDPOINT } from "../config"

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
        accessToken
        usuario {
          nombre
          correo
          contrasenia
          admin
          carrito {
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
              fecha_ingreso
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
              opinion {
                comentario
                usuario {
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
          favorito {
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
            tema {
              nombre
            }
            autor {
              nombre
            }
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
            direccion_entrega {
              id
              direccion
              infoAdicional
              telefono
              ciudad {
                cp
                nombre
                provincia {
                  id
                  nombre
                  pais {
                    id
                    nombre
                  }
                }
              }
            }
            orden_detalle {
              id
              cantidad
              precio
              libro {
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
        }
      }
    } `;

  return fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY }),
  }).then((res) => res.json());
};
