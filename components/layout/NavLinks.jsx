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
      {login?.success && (
        <Link href="/history">
          <li>Historial</li>
        </Link>
      )}
    </>
  );
};

export default NavLinks;
