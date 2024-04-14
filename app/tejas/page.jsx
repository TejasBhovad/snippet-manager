"use client";
import { useEffect, useState } from "react";
import { useFileOperations } from "./backend/file";

const Page = () => {
  const {
    createFile,
    getFiles,
    renameFile,
    deleteFile,
    updateFile,
    getAppDir,
  } = useFileOperations();
  const appDir = getAppDir();
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const [renameName, setRenameName] = useState("");
  const [originalName, setOriginalName] = useState("");

  const [fileToDelete, setFileToDelete] = useState("");
  const [fileToUpdate, setFileToUpdate] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  useEffect(() => {
    if (!appDir) {
      return;
    }
    getFiles("/Users/tejas/Library/Application Support/snippet-manager/").then(
      (result) => setFiles(result)
    );
  }, [appDir]);

  return (
    <div className="flex flex-col">
      <p>App directory: {appDir}</p>
      <pre>{JSON.stringify(files, null, 2)}</pre>
      <div className="">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="File Name"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <input
          type="text"
          value={fileContent}
          placeholder="File Content"
          onChange={(e) => setFileContent(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mt-4"
        />
        <button
          onClick={() => {
            createFile(fileName, fileContent).then(() => {
              getFiles().then((result) => setFiles(result));
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Create File
        </button>
      </div>
      <div className="">
        <input
          type="text"
          value={originalName}
          onChange={(e) => setOriginalName(e.target.value)}
          placeholder="Original Name"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mt-4"
        />
        <input
          type="text"
          value={renameName}
          placeholder="Rename Name"
          onChange={(e) => setRenameName(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mt-4"
        />
        <button
          onClick={() => {
            renameFile(originalName, renameName).then(() => {
              getFiles().then((result) => setFiles(result));
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Rename File
        </button>
      </div>
      <div className="">
        {" "}
        {/* delete filwe */}
        <input
          type="text"
          value={fileToDelete}
          onChange={(e) => setFileToDelete(e.target.value)}
          placeholder="File Name"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mt-4"
        />
        <button
          onClick={() => {
            deleteFile(fileToDelete).then(() => {
              getFiles().then((result) => setFiles(result));
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Delete File
        </button>
      </div>
      <div className="">
        {" "}
        {/* update file */}
        <input
          type="text"
          value={fileToUpdate}
          onChange={(e) => setFileToUpdate(e.target.value)}
          placeholder="File Name"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mt-4"
        />
        <input
          type="text"
          value={updatedContent}
          placeholder="Updated Content"
          onChange={(e) => setUpdatedContent(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mt-4"
        />
        <button
          onClick={() => {
            updateFile(fileToUpdate, updatedContent).then(() => {
              getFiles().then((result) => setFiles(result));
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Update File
        </button>
      </div>
    </div>
  );
};

export default Page;
