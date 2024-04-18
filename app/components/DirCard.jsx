"use client";
import React from "react";
import { PageContext } from "../context/context-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaFolder } from "react-icons/fa";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useFileOperations } from "../backend/file";

const DirCard = ({ name, files = {}, path }) => {
  const { deleteDirectory, addFileInDirectory } = useFileOperations();
  const [isAccOpen, setIsAccOpen] = useState(false);
  // New states for creating a new file
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const { setPage } = React.useContext(PageContext);

  const handleDelete = () => {
    deleteDirectory(path).then(() => {
      console.log("Directory deleted");
    });
  };
  const handleNewFileClick = () => {
    setIsCreatingFile(true);
  };

  const handleNewFileNameChange = (event) => {
    setNewFileName(event.target.value);
  };

  const handleNewFileNameBlur = () => {
    setIsCreatingFile(false);
    setNewFileName("");
  };

  const handleNewFileNameKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsAccOpen(true);
      addFileInDirectory(path, newFileName, "").then(() => {
        console.log("File created");
        setIsCreatingFile(false);
        setNewFileName("");
      });
    }
  };

  const filesArray = Object.keys(files).map((fileName) => ({
    id: fileName,
    content: files[fileName],
    path: `${path}/${fileName}`,
  }));

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="text-white w-full px-4">
          <Accordion
            type="single"
            collapsible
            value={isAccOpen}
            onValueChange={(value) => {
              setIsAccOpen(value);
            }}
          >
            <AccordionItem value={`item-1`}>
              <AccordionTrigger
                className="text-sm w-full bg-util bg-opacity-15 p-0 px-3 py-2 rounded-md flex items-center justify-start gap-2"
                value={isAccOpen}
                onValueChange={(value) => {
                  setIsAccOpen(value);
                }}
              >
                <FaFolder className="w-4 h-4 p-0 m-0 rotate-0 transform" />
                {name}
              </AccordionTrigger>
              <AccordionContent className="bg-util bg-opacity-30 border-[1px] border-util py-1 border-opacity-10 flex flex-col gap-0">
                {filesArray &&
                  filesArray.map((file) => (
                    <button
                      onClick={(e) => {
                        setPage(file.path);
                      }}
                      key={file.id}
                      className="text-left w-full bg-util bg-opacity-5 p-0 px-2 py-2 rounded-md hover:bg-opacity-25 transition-colors duration-170 ease-in-out"
                    >
                      {file.id}
                    </button>
                  ))}
                {isCreatingFile && (
                  <input
                    className="w-full px-4 bg-util bg-opacity-10 text-white border-none rounded-md p-2 outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    type="text"
                    value={newFileName}
                    onChange={handleNewFileNameChange}
                    onBlur={handleNewFileNameBlur}
                    onKeyPress={handleNewFileNameKeyPress}
                    autoFocus
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="border-util border-opacity-35 bg-primary text-white">
        <ContextMenuItem className="bg-primary">
          <button onClick={handleDelete}>Delete</button>
        </ContextMenuItem>
        <ContextMenuItem className="bg-primary">
          <button onClick={handleNewFileClick}>New File</button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default DirCard;
