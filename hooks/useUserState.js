import { useEffect, useState } from "react";
import { getUserState } from "../utils/getUserState";

const useUserState = () => {
  const [state, setState] = useState({ login: { success: false } });

  useEffect(() => {
    if (window.localStorage.getItem("userToken")) {
      const userToken = JSON.parse(window.localStorage.getItem("userToken"));
      getUserState({ token: userToken }).then((data) => {
        data.errors
          ? setState({ login: false, errors: data.errors })
          : setState(data.data);
      });
    }
  }, []);

  const setFavourite = (payload) => {
    setState({
      ...state,
      login: {
        ...state.login,
        usuario: {
          ...state.login.usuario,
          favorito: [...state.login.usuario.favorito, payload],
        },
      },
    });
  };

  const removeFavourite = (payload) => {
    setState({
      ...state,
      login: {
        ...state.login,
        usuario: {
          ...state.login.usuario,
          favorito: state.login.usuario.favorito.filter(item => item.isbn !== payload.isbn),
        },
      },
    });
  };

  return {
    setState,
    setFavourite,
    removeFavourite,
    state,
  };
};

export default useUserState;
