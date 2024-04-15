"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import LinkButton from "./components/LinkButton";
import Path from "./components/Path";
import { PageContext } from "./context/context-wrapper";
import { useFileOperations } from "./backend/file";

const page = () => {
  const [isEdited, setIsEdited] = useState(false);
  const [fileData, setFileData] = useState("");

  const { page, setPage } = useContext(PageContext);
  const { getFileContent, updateFile } = useFileOperations();

  const editedFileDataRef = useRef("");

  const updateData = async () => {
    if (page === "default" || !isEdited) {
      return;
    }

    try {
      await updateFile(page, editedFileDataRef.current);
      setFileData(editedFileDataRef.current);
    } catch (error) {
      console.error(error);
      // Handle update error (e.g., inform user)
    } finally {
      setIsEdited(false); // Reset isEdited even on error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (page === "default") {
        return;
      }
      const content = await getFileContent(page);
      setFileData(content);
      editedFileDataRef.current = content;
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    updateData();
  }, [editedFileDataRef.current]);

  return (
    <div className="w-full h-full flex flex-col overflow-x-auto">
      <div className=" w-full h-2/7 flex flex-row bg-blue-400 justify-between p-2 pt-4">
        <div
          className="px-8 text-4xl text-white font-bold"
          style={{
            minWidth: "250px",
          }}
        >
          {page != "default" && page.split("/").pop()}
        </div>
        <div className="">
          <LinkButton />
        </div>
      </div>

      <div className="bg-indigo-100 px-8">
        <Path />
      </div>
      <div className="w-full flex-grow px-8 pt-6 overflow-hidden">
        <textarea
          className="w-full h-full bg-util bg-opacity-20 rounded-t-xl text-white overflow-auto resize-none p-4"
          value={editedFileDataRef.current}
          onChange={(e) => {
            setIsEdited(true);
            editedFileDataRef.current = e.target.value;
          }}
        />
      </div>
    </div>
  );
};

export default page;
