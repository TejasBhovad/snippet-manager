import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="relative">
        <FaSearch color="gray" size={25} className="absolute top-0 left-2 h-full flex items-center pl-2 " />
        <input
          className="rounded-lg border-black border-2 p-2 pl-11 bg-indigo-900 text-white placeholder-white"
          type="text"
          placeholder="Search Snippets..."
        />
      </div>
    </div>
  );
};

export default Searchbar;

