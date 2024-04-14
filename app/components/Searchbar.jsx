"use client";
import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
const Searchbar = () => {
  const [search, setSearch] = useState("");
//  TODO backend rust function to search snippets

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("searching for", search);
    }
  };
  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="relative">
        <FaSearch color="gray" size={25} className="absolute top-0 left-2 h-full flex items-center pl-2 " />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Snippets..."
          onKeyDown={handleKeyPress}
          className="rounded-lg border-black border-2 p-2 pl-11 bg-indigo-900 text-white placeholder-white"
        />
      </div>
    </div>
  );
};

export default Searchbar;

