import Link from "next/link";
import React from "react";

const NavLinks = () => {
  return (
    <>
      <Link href="/books">
        <li>Libros</li>
      </Link>
      <li>Categorías</li>
    </>
  );
};

export default NavLinks;
