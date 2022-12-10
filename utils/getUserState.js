import fetchSetter from "./fetchSetter";

export const getUserState = async ({
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
          direccion {
            direccion
            id
            nombre
            infoAdicional
            dni
            telefono
            ciudad {
              cp
              nombre
            }
          }
          carrito {
            nro_linea
            cantidad
            cupon {
              codigo_cupon
              porc_descuento
              utilizado
            }
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

  const data = await fetchSetter(QUERY);
  return data;
};
