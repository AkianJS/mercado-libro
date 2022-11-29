import "../styles/globals.css";
import AppContext from "../context/AppContext";
import useUserState from "../hooks/useUserState";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });

  const userState = useUserState();

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={userState}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
