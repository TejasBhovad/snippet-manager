import React from "react";
import { FaFileCirclePlus } from "react-icons/fa6";
import { HiFolderPlus } from "react-icons/hi2";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegMinusSquare } from "react-icons/fa";
const FileOperations = () => {
  return (
    <div className="flex justify-between flex-row px-4 w-full">
      <button>
        <div className="w-10 rounded-xl bg-util aspect-square flex items-center justify-center bg-opacity-40">
          <FaFileCirclePlus size={18} color="white" />
        </div>
      </button>
      <button>
        <div className="w-10 rounded-xl bg-util aspect-square flex items-center justify-center bg-opacity-40">
          <HiFolderPlus size={18} color="white" />
        </div>
      </button>
      <button>
        <div className="w-10 rounded-xl bg-util aspect-square flex items-center justify-center bg-opacity-40">
          <IoKeyOutline size={18} color="white" />
        </div>
      </button>
      <button>
        <div className="w-10 rounded-xl bg-util aspect-square flex items-center justify-center bg-opacity-40">
          <FaRegMinusSquare size={18} color="white" />
        </div>
      </button>
    </div>
  );
};

export default FileOperations;
