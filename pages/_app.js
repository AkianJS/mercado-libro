import "../styles/globals.css";
import AppContext from "../context/AppContext";
import useUserState from "../hooks/useUserState";
import useTheme from "../hooks/useTheme";

function MyApp({ Component, pageProps }) {

  const userState = useUserState();
  const themeState = useTheme();

  return (
      <AppContext.Provider value={{ ...userState, ...themeState }}>
        <Component {...pageProps} />
      </AppContext.Provider>
  );
}

export default MyApp;
