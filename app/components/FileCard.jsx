"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useFileOperations } from "../backend/file";
import React from "react";
import { PageContext } from "../context/context-wrapper";
const FileCard = ({ name, path, content }) => {
  const { deleteFile } = useFileOperations();
  const { setPage } = React.useContext(PageContext);

  const handleDelete = () => {
    deleteFile(path).then(() => {
      console.log("File deleted");
    });
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
      </ContextMenuTrigger>
      <ContextMenuContent className="border-util border-opacity-35 bg-primary text-white">
        <ContextMenuItem className="bg-primary">
          {/* delete btn */}
          <button onClick={handleDelete}>Delete</button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FileCard;
