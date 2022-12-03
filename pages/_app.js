import "../styles/globals.css";
import AppContext from "../context/AppContext";
import useUserState from "../hooks/useUserState";

function MyApp({ Component, pageProps }) {


  const userState = useUserState();

  return (
      <AppContext.Provider value={userState}>
        <Component {...pageProps} />
      </AppContext.Provider>
  );
}

export default MyApp;
