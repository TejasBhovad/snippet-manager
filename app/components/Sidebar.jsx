"use client";
import React from "react";
import Searchbar from "./Searchbar";
import FileOperations from "./FileOperations";

import DirCard from "./DirCard";
import FileCard from "./FileCard";
import UserCard from "./Usercard";
import SecuredCard from "./SecuredCard";
import { useFileOperations } from "../backend/file";
import { useState, useEffect, useRef } from "react";
const Sidebar = () => {
  const ignoredFiles = [".DS_Store"];
  const {
    createFile,
    getFiles,
    renameFile,
    deleteFile,
    updateFile,
    getAppDir,
    createDirectory,
    getDirectories,
    deleteDirectory,
    updateDirectory,
  } = useFileOperations();
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState([]);
  const [directories, setDirectories] = useState([]);
  const [appDir, setAppDir] = useState(null);

  useEffect(() => {
    setAppDir(getAppDir());
  }, [getAppDir]);

  const [isMounted, setIsMounted] = useState(false);
  const [clickCreateFile, setClickCreateFile] = useState(false);
  const [clickCreateDirectory, setClickCreateDirectory] = useState(false);

  const [inputFileName, setInputFileName] = useState("");
  const [inputDirectory, setInputDirectory] = useState("");

  const fileRef = useRef(null);
  const directoryRef = useRef(null);

  const handleInputChange = (event) => {
    setInputFileName(event.target.value);
  };
  const handleDirectoryChange = (event) => {
    setInputDirectory(event.target.value);
  };
  useEffect(() => {
    if (clickCreateFile && fileRef.current) {
      fileRef.current.focus();
    }
  }, [clickCreateFile]);
  useEffect(() => {
    if (clickCreateDirectory && directoryRef.current) {
      directoryRef.current.focus();
    }
  }, [clickCreateDirectory]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setClickCreateFile(false);
    }
  };
  const handleDirectoryKeyDown = (event) => {
    if (event.key === "Escape") {
      setClickCreateDirectory(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleDirectoryKeyDown);

    return () => {
      window.removeEventListener("keydown", handleDirectoryKeyDown);
    };
  }, []);

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      createFileFunction(inputFileName, "default content");
      setInputFileName("");
    }
  };
  const handleClickOutside = (event) => {
    if (fileRef.current && !fileRef.current.contains(event.target)) {
      setClickCreateFile(false);
      setInputFileName("");
    }
    if (directoryRef.current && !directoryRef.current.contains(event.target)) {
      setClickCreateDirectory(false);
      setInputDirectory("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleDirectoryKeyPress = (event) => {
    if (event.key === "Enter") {
      createDirectoryFunction(inputDirectory);
      setInputDirectory("");
    }
  };

  useEffect(() => {
    const appDir = getAppDir();
    if (!appDir) {
      return;
    }
    getFiles().then((result) => setFiles(result));
  }, [getAppDir]);

  useEffect(() => {
    const appDir = getAppDir();
    if (!appDir) {
      return;
    }
    getDirectories().then((result) => setDirectories(result));
  }, [getAppDir]);

  const createFileFunction = (file_name, file_content) => {
    if (!file_name || !file_content) {
      return;
    }
    createFile(file_name, file_content).then(() => {
      getFiles().then((result) => setFiles(result));
    });
    setClickCreateFile(false);
  };

  const createDirectoryFunction = (dir_name) => {
    if (!dir_name) {
      return;
    }
    createDirectory(dir_name).then(() => {
      getFiles().then((result) => setFiles(result));
    });
    setClickCreateDirectory(false);
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <div
      className="w-1/5 h-full flex flex-col items-center bg-secondary bg-opacity-5 py-4 gap-4"
      style={{
        minWidth: "200px",
        maxWidth: "250px",
      }}
    >
      <Searchbar search={search} setSearch={setSearch} />
      <FileOperations
        clickCreateFile={clickCreateFile}
        setClickCreateFile={setClickCreateFile}
        clickCreateDirectory={clickCreateDirectory}
        setClickCreateDirectory={setClickCreateDirectory}
      />
      {/* <VisibilityFilter /> */}
      <span className="text-xs font-semibold w-full px-5 text-white opacity-50">
        SNIPPETS
      </span>

      <div className="w-full flex-grow gap-1 flex flex-col overflow-y-auto">
        {clickCreateFile && (
          <div className="w-full px-4">
            <input
              ref={fileRef}
              type="text"
              value={inputFileName}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              className="w-full px-4 bg-util bg-opacity-10 text-white border-none rounded-md p-2 outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            />
          </div>
        )}
        {clickCreateDirectory && (
          <div className="w-full px-4">
            <input
              ref={directoryRef}
              type="text"
              value={inputDirectory}
              onChange={handleDirectoryChange}
              onKeyPress={handleDirectoryKeyPress}
              className="w-full px-4 bg-util bg-opacity-10 text-white border-none rounded-md p-2 outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            />
          </div>
        )}

        {files &&
          Object.keys(files)
            .filter((fileName) => fileName.includes(search))
            .map((fileName) => {
              if (ignoredFiles.includes(fileName)) {
                return null;
              }
              const filePath = `${appDir}${fileName}`;
              return (
                <FileCard
                  key={fileName}
                  name={fileName}
                  content={files[fileName]}
                  path={filePath}
                />
              );
            })}

        {/* map the directories */}
        {directories &&
          Object.keys(directories)
            .filter((dirName) => dirName.includes(search))
            .map((dirName) => {
              const dirPath = `${appDir}${dirName}`;
              return (
                <DirCard
                  key={dirName}
                  name={dirName}
                  files={directories[dirName]}
                  path={dirPath}
                />
              );
            })}
        {/* <div className="absolute left-96">
          <pre className="text-white">{JSON.stringify(files, null, 2)}</pre>
          <pre className="text-white">
            {JSON.stringify(directories, null, 2)}
          </pre>
        </div> */}

        {/* <SecuredCard
          directory={{ name: "Directory 2", files: ["File 3", "File 4"] }}
        /> */}
      </div>
      {/* <div className="h-12 w-full px-2">
        <UserCard />
      </div> */}
    </div>
  );
};

export default Sidebar;
