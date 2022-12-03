import { useRouter } from "next/router";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";

const NavSearch = ({ isSearching }) => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
    router.push(`/books/?query=${search}`);
    searchRef.current.value = "";
  };

  return (
    <form onSubmit={handleSearch}>
      <div
        className={`w-full h-10 fixed top-16 left-0 z-30 m-auto overflow-hidden ${
          isSearching ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`w-full max-w-screen-xl h-full relative flex justify-center  -translate-y-12 items-center m-auto transition-transform ${
            isSearching ? "translate-y-0" : "pointer-events-none"
          }`}
        >
          <input
            ref={searchRef}
            className="w-full max-w-screen-xl h-full outline-none pl-8 bg-white rounded-b-md"
            type="text"
            placeholder="Titulo, isbn, categoría..."
          />
          <button
            className="max-w-screen-xl border-none outline-none bg-transparent absolute left-0 pl-2"
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
