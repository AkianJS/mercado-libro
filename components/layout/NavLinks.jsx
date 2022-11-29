import Link from "next/link";
import React from "react";

const NavLinks = () => {
  return (
    <>
      <Link href="/books">
        <li>Libros</li>
      </Link>
      <Link href="/categories">
      <li>Categorías</li>
      </Link>
    </>
  );
};

export default NavLinks;
