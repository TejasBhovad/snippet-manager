import React from "react";
import { FaFileCirclePlus } from "react-icons/fa6";
import { HiFolderPlus } from "react-icons/hi2";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegMinusSquare } from "react-icons/fa";
const FileOperations = ({
  clickCreateFile,
  setClickCreateFile,
  clickCreateDirectory,
  setClickCreateDirectory,
}) => {
  return (
    <div className="h-auto flex justify-between flex-row px-4 gap-2 w-full">
      <button
        className="w-1/2 h-full"
        onClick={
          clickCreateFile
            ? () => setClickCreateFile(false)
            : () => setClickCreateFile(true)
        }
      >
        <div className="p-2 w-full rounded-xl bg-util flex items-center justify-center bg-opacity-40">
          <FaFileCirclePlus size={18} color="white" />
        </div>
      </button>
      <button
        className="w-1/2"
        onClick={
          clickCreateDirectory
            ? () => setClickCreateDirectory(false)
            : () => setClickCreateDirectory(true)
        }
      >
        <div className="p-2 w-full rounded-xl bg-util flex items-center justify-center bg-opacity-40">
          <HiFolderPlus size={18} color="white" />
        </div>
      </button>
      {/* <button>
        <div className="w-10 rounded-xl bg-util aspect-square flex items-center justify-center bg-opacity-40">
          <IoKeyOutline size={18} color="white" />
        </div>
      </button>
      <button>
        <div className="w-10 rounded-xl bg-util aspect-square flex items-center justify-center bg-opacity-40">
          <FaRegMinusSquare size={18} color="white" />
        </div>
      </button> */}
    </div>
  );
};

export default FileOperations;
