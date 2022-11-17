import { useState } from "react";

const useUserState = () => {
  const [state, setState] = useState({ logged: false });

  const setIsLogged = (payload) => {
    setState({
      ...state,
      logged: [payload]
    });
  };

  return {
    setIsLogged,
    state
  };
};

export default useUserState;
