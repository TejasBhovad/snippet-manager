"use client";

import React, { useState, useEffect, useRef, useContext } from "react";

import { FaRegCopy } from "react-icons/fa";
import ReactAce from "react-ace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-elixir";

import "ace-builds/src-noconflict/theme-dracula";

import { FaExternalLinkSquareAlt } from "react-icons/fa";

import { TbUnlink } from "react-icons/tb";
import { PageContext } from "./context/context-wrapper";
import { useFileOperations } from "./backend/file";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
// const highlightedCode = hljs.highlight("<span>Hello World!</span>", {
//   language: "xml",
// }).value;
const page = () => {
  const languages = [
    "javascript",
    "python",
    "java",
    "csharp",
    "ruby",
    "golang",
    "html",
    "css",
    "json",
    "xml",
    "markdown",
    "typescript",
    "elixir",
  ];

  const [carbonUrl, setCarbonUrl] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [fileLanguage, setFileLanguage] = useState(languages[0]); // Default to JavaScript
  const [fileData, setFileData] = useState("");
  const [fileName, setFileName] = useState("");
  const [pagesList, setPagesList] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);
  const fileNameInputRef = useRef(null);
  const [appDir, setAppDir] = useState("none");
  const [isShared, setIsShared] = useState(false);
  const { page, setPage } = useContext(PageContext);

  const textareaRef = useRef();
  const [showCopyButton, setShowCopyButton] = useState(false);

  const copyToClipboard = () => {
    textareaRef.current.select();
    document.execCommand("copy");
  };
  const [isMouseOverButton, setIsMouseOverButton] = useState(false);

  const { getFileContent, updateFile, renameFile, getAppDir } =
    useFileOperations();

  const editedFileDataRef = useRef("");
  useEffect(() => {
    setAppDir(getAppDir());
  }, [getAppDir]);

  const updateData = async () => {
    if (page === "default" || !isEdited) {
      return;
    }

    try {
      await updateFile(page, editedFileDataRef.current);
      setFileData(editedFileDataRef.current);
      // set fiellanguage based on content
      // setFileLanguage(determineLanguage(editedFileDataRef.current));
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
      setFileName(page.split("/").pop());
    };

    fetchData();
  }, [page]);

  // function determineLanguage(fileContent) {
  //   if (typeof fileContent !== "string") {
  //     return "unknown";
  //   }
  //   if (fileContent.includes("function") && fileContent.includes("var")) {
  //     return "javascript";
  //   } else if (fileContent.includes("def") && fileContent.includes("print")) {
  //     return "python";
  //   } else if (fileContent.includes("public static void main")) {
  //     return "java";
  //   } else if (fileContent.includes("using System;")) {
  //     return "csharp";
  //   } else if (fileContent.includes("puts") && fileContent.includes("end")) {
  //     return "ruby";
  //   } else if (fileContent.includes("func main()")) {
  //     return "golang";
  //   } else if (fileContent.includes("<html>")) {
  //     return "html";
  //   } else if (fileContent.includes("{") && fileContent.includes(":")) {
  //     return "css";
  //   } else if (fileContent.includes("{") && fileContent.includes("}")) {
  //     return "json";
  //   } else if (fileContent.includes("<") && fileContent.includes(">")) {
  //     return "xml";
  //   } else if (fileContent.includes("# ")) {
  //     return "markdown";
  //   } else if (fileContent.includes("import") && fileContent.includes("from")) {
  //     return "typescript";
  //   } else if (
  //     fileContent.includes("defmodule") &&
  //     fileContent.includes("do")
  //   ) {
  //     return "elixir";
  //   } else {
  //     return "unknown";
  //   }
  // }

  useEffect(() => {
    updateData();
  }, [editedFileDataRef.current]);

  useEffect(() => {
    if (fileNameInputRef.current) {
      fileNameInputRef.current.focus();
      const pos = fileNameInputRef.current.value.lastIndexOf(".");
      fileNameInputRef.current.setSelectionRange(pos, pos);
    }
  }, [fileName]);
  useEffect(() => {
    if (page !== "default") {
      setPagesList((prevPagesList) => {
        const existingPageIndex = prevPagesList.indexOf(page);
        let newPagesList; // Define newPagesList here
        if (existingPageIndex !== -1) {
          // If the page already exists in the list, remove it
          newPagesList = [...prevPagesList];
          newPagesList.splice(existingPageIndex, 1);
        } else {
          newPagesList = [...prevPagesList];
        }
        // If the list is longer than 10, remove the first element
        if (newPagesList.length > 10) {
          newPagesList.shift();
        }
        // Add the page at the end of the list
        newPagesList.push(page);
        return newPagesList;
      });
    }
  }, [page]);

  const handleFileNameChange = async (e) => {
    const newFileName = e.target.value;
    setFileName(newFileName);
    try {
      await renameFile(page, newFileName);
      setPage(newFileName);
    } catch (error) {
      console.error(error);
      // Handle rename error (e.g., inform user)
    }
  };

  const handleShare = async () => {
    //  copy text to clipboard
    navigator.clipboard.writeText(editedFileDataRef.current);
  };

  return (
    <div className="w-full h-full">
      {page !== "default" ? (
        <div className="w-full h-full flex flex-col overflow-x-auto">
          <div className="px-8 w-full h-2/7 flex flex-row justify-between p-2 pt-4 gap-2">
            <input
              ref={fileNameInputRef}
              className=" flex-grow rounded-md p-2 text-4xl text-white font-bold bg-transparent border-none"
              style={{
                minWidth: "250px",
              }}
              value={fileName}
              onChange={handleFileNameChange}
            />
            <div className="flex items-center h-full">
              {isShared ? (
                <div className="flex gap-2">
                  <button className="flex items-center justify-center gap-2 text-white bg-opacity-25 border-gray-500 no-select border-opacity-20 border-[1px] bg-gray-500 p-2 rounded-md">
                    <FaExternalLinkSquareAlt />
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 text-white bg-opacity-25 border-red-500 no-select border-opacity-20 border-[1px] bg-red-500 py-1 px-3 rounded-md"
                    // onclickj set is shared to false
                    onClick={() => setIsShared(false)}
                    on
                  >
                    <TbUnlink />
                    UnShare
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <button
                    className="flex items-center justify-center gap-2 text-white bg-opacity-25 border-green-500 no-select border-opacity-20 border-[1px] bg-green-500 py-1 px-3 rounded-md"
                    onClick={handleShare}
                  >
                    <FaShareAlt />
                    Share
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="px-8 py-2 flex gap-2 text-white">
            <button
              className="disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPageIndex <= 0}
              onClick={() => {
                if (currentPageIndex > 0) {
                  const prevPage = pagesList[currentPageIndex - 1];
                  setPage(prevPage);
                  setCurrentPageIndex(currentPageIndex - 1);
                }
              }}
            >
              <FaRegArrowAltCircleLeft size={25} />
            </button>
            <button
              className="disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPageIndex >= pagesList.length - 1}
              onClick={() => {
                if (currentPageIndex < pagesList.length - 1) {
                  const nextPage = pagesList[currentPageIndex + 1];
                  setPage(nextPage);
                  setCurrentPageIndex(currentPageIndex + 1);
                }
              }}
            >
              <FaRegArrowAltCircleRight size={25} />
            </button>

            <Select onValueChange={(value) => setFileLanguage(value)}>
              <SelectTrigger>
                <SelectValue placeholder="select language">
                  {fileLanguage}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem
                    value={lang}
                    onClick={() => setFileLanguage(lang)}
                  >
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="px-2 flex items-center w-full gap-1">
              {page
                .replace(appDir, "")
                .split("/")
                .map((part, index, array) => (
                  <React.Fragment key={index}>
                    <span className="text-sm bg-util py-1 px-2 bg-opacity-50 rounded-md">
                      {part}
                    </span>
                    {index < array.length - 1 && (
                      <span className="text-sm bg-util py-1 px-2 bg-opacity-50 rounded-md">
                        {" "}
                        &gt;{" "}
                      </span>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
          <div className="w-full flex-grow px-8 pt-2 overflow-hidden relative">
            <ReactAce
              mode={fileLanguage}
              theme="dracula"
              className="text-xl"
              value={editedFileDataRef.current}
              onChange={(value) => {
                setIsEdited(true);
                editedFileDataRef.current = value;
              }}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
                wrap: true,
              }}
              style={{ width: "100%", borderRadius: "4px", padding: "10px" }}
            />

            {showCopyButton && (
              <button
                className="absolute right-10 top-4 bg-util bg-opacity-50 text-white transition-all duration-350 p-2 rounded-md hover:bg-opacity-100"
                onClick={copyToClipboard}
                onMouseOver={() => setIsMouseOverButton(true)}
                onMouseOut={() => setIsMouseOverButton(false)}
              >
                <FaRegCopy className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white text-2xl">
          Select a file to view or edit
          {/* <span className="text-white"> {appDir}</span> */}
        </div>
      )}
    </div>
  );
};

export default page;
