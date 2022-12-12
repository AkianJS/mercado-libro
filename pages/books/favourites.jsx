import React, { useContext, useEffect, useState } from "react";
import BooksGrid from "../../components/BooksGrid";
import Layout from "../../components/layout/Layout";
import AppContext from "../../context/AppContext";
import { getFavourites } from "../../utils/getFavourites";

const Favourites = () => {
  const {
    state: { login },
  } = useContext(AppContext);
  const [favouritesBooks, setFavouritesBooks] = useState(null);
  console.log(favouritesBooks);

  useEffect(() => {
    let isCleaning = false;
    if (!isCleaning) {
      getFavourites({ token: login.accessToken }).then((res) =>
        setFavouritesBooks(res.data?.getFavoritos)
      );
    }
    return () => {
      isCleaning = true;
    };
  }, [login]);

  return (
    <Layout>
      <BooksGrid texth3="Favoritos" books={favouritesBooks} />
    </Layout>
  );
};

export default Favourites;
