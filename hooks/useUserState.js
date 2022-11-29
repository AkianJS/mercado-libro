import { useEffect, useState } from "react";
import { getUserState } from "../utils/getUserState";

const useUserState = () => {
  const [state, setState] = useState({ Login: { success: false } });

  const setIsLogged = (payload) => {
    setState({
      ...state,
      logged: payload,
    });
  };

  return {
    setState,
    setIsLogged,
    state,
  };
};

export default useUserState;
