import React from "react";
import LinkButton from "./components/LinkButton";
import Path from "./components/Path";

const page = () => {
  return (
    <div className="w-full h-full bg-green-300 flex flex-col overflow-x-auto">
      <div className=" w-full h-2/7 flex flex-row bg-blue-400 justify-between p-2 pt-4">
        <div
          className=" text-4xl text-white pl-8"
          style={{
            minWidth: "250px",
          }}
        >
          Project Title
        </div>
        <div className="pr-20">
          <LinkButton />
        </div>
      </div>

      <div className="bg-indigo-100 ">
        <Path />
      </div>
      <div className="w-full flex-grow bg-red-400">hfhf</div>
    </div>
  );
};

export default page;
