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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useFileOperations } from "../backend/file";

const DirCard = ({ name, files = {}, path }) => {
  const { setPage } = React.useContext(PageContext);
  const { deleteDirectory } = useFileOperations();

  const handleDelete = () => {
    deleteDirectory(path).then(() => {
      console.log("Directory deleted");
    });
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
          <Accordion type="single" collapsible>
            <AccordionItem value={`item-1`}>
              <AccordionTrigger className="text-sm w-full bg-util bg-opacity-15 p-0 px-3 py-2 rounded-md flex items-center justify-start gap-2">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="border-util border-opacity-35 bg-primary text-white">
        <ContextMenuItem className="bg-primary">
          <button onClick={handleDelete}>Delete</button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default DirCard;
