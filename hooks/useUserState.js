import { useState } from "react";

const useUserState = () => {
  const [state, setState] = useState({ logged: true });

  const setIsLogged = (payload) => {
    setState({
      ...state,
      logged: payload
    });
  };

  return {
    setIsLogged,
    state
  };
};

export default useUserState;
