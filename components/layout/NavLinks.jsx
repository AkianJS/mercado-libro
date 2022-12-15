import Link from "next/link";
import React from "react";

const NavLinks = ({ login }) => {
  return (
    <>
      <Link href="/books">
        <li>Libros</li>
      </Link>
      <Link href="/categories">
        <li>Categorías</li>
      </Link>
      {login?.success && !login?.usuario?.admin && (
        <Link href="/history">
          <li>Historial</li>
        </Link>
      )}
      {login?.success && !login?.usuario?.admin && (
        <Link href="/books/favourites">
          <li>Favoritos</li>
        </Link>
      )}
      {login.usuario?.admin &&  (
        <Link href="/admin-panel">
          <li>Admin</li>
        </Link>
      )}
    </>
  );
};

export default NavLinks;
