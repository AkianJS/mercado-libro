import Link from "next/link";
import React from "react";

const NavLinks = ({ login }) => {
  return (
    <>
      <Link href="/books">
        <li className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Libros</li>
      </Link>
      <Link href="/categories">
        <li className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Categorias</li>
      </Link>
      {login?.success && !login?.usuario?.admin && (
        <Link href="/history">
          <li className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Historial</li>
        </Link>
      )}
      {login?.success && !login?.usuario?.admin && (
        <Link href="/books/favourites">
          <li className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Favoritos</li>
        </Link>
      )}
      {login.usuario?.admin &&  (
        <Link href="/admin">
          <li className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Admin</li>
        </Link>
      )}
    </>
  );
};

export default NavLinks;
