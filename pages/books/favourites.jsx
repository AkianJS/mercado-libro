import React, { useContext, useEffect, useState } from "react";
import BooksGrid from "../../components/BooksGrid";
import Layout from "../../components/layout/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import Loader from "../../components/ui/Loader";
import AppContext from "../../context/AppContext";
import { getFavourites } from "../../utils/getFavourites";

const Favourites = () => {
  const {
    state: { login },
  } = useContext(AppContext);
  const [favouritesBooks, setFavouritesBooks] = useState(null);

  useEffect(() => {
    getFavourites({ token: login.accessToken }).then((res) =>
      setFavouritesBooks(res.data?.getFavoritos)
    );
  }, [login]);

  if (!favouritesBooks)
    return (
      <Layout>
        <div className="w-ful p-2 mt-8 flex justify-center">
          <Loader />
        </div>
      </Layout>
    );

  return (
    <Layout>
      <ProtectedRoute
        myBoolean={login.success}
        isLoading={login.isLoading}
        path="/"
      >
        <BooksGrid texth3="Favoritos" books={favouritesBooks} />
      </ProtectedRoute>
    </Layout>
  );
};

export default Favourites;
