import { useEffect, useState } from "react";
import { getUserState } from "../utils/getUserState";
import { removeFav } from "../utils/removeFavourite";
import { setFav } from "../utils/setFavourite";

const useUserState = () => {
  const [state, setState] = useState({
    login: { success: false, isLoading: true },
  });

  useEffect(() => {
    if (window.localStorage.getItem("userToken")) {
      const userToken = JSON.parse(window.localStorage.getItem("userToken"));
      getUserState({ token: userToken }).then((data) => {
        data.errors
          ? setState({ login: false, errors: data.errors })
          : setState(data.data);
      });
    } else {
      setState({ login: { success: false, isLoading: false } });
    }
  }, []);

  const setFavourite = (payload) => {
    setFav({ isbn: payload.isbn, tokenUser: state.login.accessToken }).then(
      (data) => {
        if (data.data.insertFav.success)
          setState({
            ...state,
            login: {
              ...state.login,
              usuario: {
                ...state.login.usuario,
                favorito: state.login.usuario.favorito
                  ? [...state.login.usuario.favorito, payload]
                  : [payload],
              },
            },
          });
      }
    );
  };

  const removeFavourite = (payload) => {
    console.log(payload)
    removeFav({ isbn: payload.isbn, tokenUser: state.login.accessToken }).then(
      (data) => {
        console.log(data)
        if (data.errors || !data) return;
        setState({
          ...state,
          login: {
            ...state.login,
            usuario: {
              ...state.login.usuario,
              favorito: state.login.usuario.favorito.filter(
                (item) => item.isbn !== payload.isbn
              ),
            },
          },
        });
      }
    );
  };

  const addToCart = (payload) => {
    setState({
      ...state,
      login: {
        ...state.login,
        usuario: {
          ...state.login.usuario,
          carrito: state.login.usuario.carrito
            ? [...state.login.usuario.carrito, payload]
            : payload,
        },
      },
    });
  };

  return {
    setState,
    setFavourite,
    removeFavourite,
    addToCart,
    state,
  };
};

export default useUserState;
