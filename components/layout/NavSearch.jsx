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
console.log(isSearching)
  return (
    <form className="absolute top-16" onSubmit={handleSearch}>
      <div
        className={`w-full h-10 fixed z-50 m-auto overflow-hidden ${
          isSearching ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`w-full max-w-screen-xl h-full relative flex justify-center items-center m-auto transition-transform ${
            isSearching ? "translate-y-0" : "pointer-events-none -translate-y-12"
          }`}
        >
          <input
            ref={searchRef}
            className="w-full max-w-screen-xl h-full outline-none pl-8 bg-white rounded-b-md"
            type="text"
            placeholder="Titulo del libro..."
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
