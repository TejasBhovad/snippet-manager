import React from "react";
import Searchbar from "./Searchbar";
import FileOperations from "./FileOperations";
import VisibilityFilter from "./VisibilityFilter";
import DirCard from "./DirCard";
import UserCard from "./Usercard";
import SecuredCard from "./SecuredCard";
const Sidebar = () => {
  return (
    <div
      className="w-1/5 h-full flex flex-col items-center bg-secondary bg-opacity-5 py-4 gap-4"
      style={{
        minWidth: "200px",
        maxWidth: "250px",
      }}
    >
      <Searchbar />
      <FileOperations />
      <VisibilityFilter />
      <span className="text-xs font-semibold w-full px-5 text-white opacity-50">
        SNIPPETS
      </span>

      <div className="w-full flex-grow gap-1 flex flex-col overflow-y-auto">
        <DirCard
          directory={{ name: "Directory 1", files: ["File 1", "File 2"] }}
        />
        <SecuredCard
          directory={{ name: "Directory 2", files: ["File 3", "File 4"] }}
        />
      </div>
      <div className="h-12 w-full px-2">
        <UserCard />
      </div>
    </div>
  );
};

export default Sidebar;
