"use client";
import React from "react";
import { PageContext } from "../context/context-wrapper";
const FileCard = ({ name, path, content }) => {
  const { setPage } = React.useContext(PageContext);
  return (
    <div className="px-4 text-white">
      <button
        onClick={(e) => {
          setPage(path);
        }}
        key={name}
        className="text-left w-full bg-util bg-opacity-15 p-0 px-2 py-2 rounded-md hover:bg-opacity-25 transition-colors duration-170 ease-in-out"
      >
        {/* {path} */}
        {name}
      </button>
    </div>
  );
};

export default FileCard;
