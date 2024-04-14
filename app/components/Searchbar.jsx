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
    <div className="flex flex-col w-full px-4">
      <div className="relative">
        <FaSearch
          color="gray"
          size={20}
          className="absolute top-0 left-2 h-full flex items-center  "
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Snippets..."
          onKeyDown={handleKeyPress}
          className="rounded-sm p-2 pl-8 bg-util text-white text-opacity-85 placeholder-white w-full bg-opacity-35 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default Searchbar;
