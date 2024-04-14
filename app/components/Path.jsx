import React from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Path = () => {
  return (
    <div className="flex flex-row gap-3 w-full  ">
      <div className="gap-2 flex flex-row p-2">
        <FaRegArrowAltCircleLeft size={25} />
        <FaRegArrowAltCircleRight size={25} />
      </div>
    </div>
  );
};

export default Path;
