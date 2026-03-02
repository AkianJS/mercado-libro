import { useRouter } from "next/router";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";

const NavSearch = ({ isSearching }) => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
    router.push(`/books?query=${search}`);
    searchRef.current.value = "";
  };

  return (
    <form className="absolute" onSubmit={handleSearch}>
      <div
        className={`w-full h-12 fixed top-16 left-0 z-30 m-auto overflow-hidden ${
          isSearching ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`w-full max-w-screen-xl h-full relative flex justify-center items-center m-auto transition-transform ${
            isSearching ? "translate-y-0" : "pointer-events-none -translate-y-14"
          }`}
        >
          <input
            ref={searchRef}
            className="w-full max-w-screen-xl h-full outline-none pl-10 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-lg transition-colors"
            type="text"
            placeholder="Titulo del libro, isbn, autor..."
          />
          <button
            className="max-w-screen-xl border-none outline-none bg-transparent absolute left-0 pl-3 text-slate-400 dark:text-slate-500"
            type="submit"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </form>
  );
};

export default NavSearch;
