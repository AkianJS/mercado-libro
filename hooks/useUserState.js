import { useEffect, useState } from "react";
import { getUserState } from "../utils/getUserState";
import { removeFav } from "../utils/removeFavourite";
import { setBookTocart } from "../utils/setBookToCart";
import { setFav } from "../utils/setFavourite";

const useUserState = () => {
  const [state, setState] = useState({
    login: { success: false, isLoading: true },
  });

  useEffect(() => {
    if (window.localStorage.getItem("userToken")) {
      const userToken = JSON.parse(window.localStorage.getItem("userToken"));
      getUserState({ token: userToken }).then((res) => {
        const { errors, data } = res;
        if (errors || !data)
          setState({ login: { success: false, isLoading: true } });
        else setState(data);
      });
    }
  }, []);

  const updateUserInfo = () => {
    getUserState({ token: state.login.accessToken }).then((res) => {
      const { errors, data } = res;
      if (errors || !data)
        setState({ login: { success: false, isLoading: true } });
      else setState(data);
    });
  };

  const setFavourite = (payload) => {
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
    setFav({ isbn: payload.isbn, token: state.login.accessToken }).then(
      (data) => data
    );
  };

  const removeFavourite = (payload) => {
    removeFav({ isbn: payload.isbn, token: state.login.accessToken }).then(
      (data) => {
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


  return {
    setState,
    setFavourite,
    removeFavourite,
    updateUserInfo,
    state,
  };
};

export default useUserState;
