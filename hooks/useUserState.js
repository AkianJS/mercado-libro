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
      getUserState({ token: userToken }).then((res) => {
        const { errors, data } = res;
        if (errors || !data)
          setState({ login: { success: false, isLoading: true } });
        else if (data) setState(data);
      });
    } else setState({ login: { success: false, isLoading: false } });
  }, []);

  const updateUserInfo = async () => {
    const res = await getUserState({ token: state.login.accessToken })
      const { errors, data } = res;
      if (errors || !data)
        setState({ login: { success: false, isLoading: true } });
      else setState(data);
    };

  const setFavourite = async (payload) => {
    const res = await setFav({ isbn: payload.isbn, token: state.login.accessToken })
    await updateUserInfo()
  };

  const removeFavourite = async (payload) => {
    const res = await removeFav({ isbn: payload.isbn, token: state.login.accessToken })
    await updateUserInfo()
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
