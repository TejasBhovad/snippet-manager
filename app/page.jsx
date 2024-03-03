"use client";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appLocalDataDir } from "@tauri-apps/api/path";

const Page = () => {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [appDir, setAppDir] = useState("");
  const [fileName, setFileName] = useState("test_file.md");
  const [fileContent, setFileContent] = useState("heehaw");
  const [isMounted, setIsMounted] = useState(false);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    invoke("greet", { name: name })
      .then((result) => setGreeting(result))
      .catch(console.error);
  }, [name]);

  const createFile = async () => {
    invoke("add_file", {
      fileName: fileName,
      fileContent: fileContent,
      appDir: appDir,
    })
      .then((result) => console.log(result))
      .catch(console.error);
  };

  const getLocalDir = async () => {
    appLocalDataDir()
      .then((result) => setAppDir(result))
      .catch(console.error);
  };

  const getFiles = async () => {
    invoke("get_files", { appDir: appDir })
      .then((result) => setFiles(result))
      .catch(console.error);
  };

  useEffect(() => {
    if (isMounted) {
      getLocalDir();
    }
  }, [isMounted]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <input
        type="text"
        className="px-4 py-2 mb-4 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h1 className="text-2xl font-bold text-blue-500">{greeting}</h1>
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-500 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:opacity-85 transition-all"
        onClick={() => createFile()}
      >
        create file
      </button>
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-500 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:opacity-85 transition-all"
        onClick={() => getLocalDir()}
      >
        get local dir
      </button>
      <span className="text-black">
        <h1>App Local Data Dir: {appDir}</h1>
      </span>
      <span className="text-black">
        <button
          className="px-4 py-2 mt-4 text-white bg-blue-500 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:opacity-85 transition-all"
          onClick={() => getFiles()}
        >
          get files
        </button>
        <h1>Files:</h1>
        {JSON.stringify(files)}
      </span>
    </div>
  );
};

export default Page;
