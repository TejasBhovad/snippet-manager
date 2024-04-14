"use client";
import React from "react";
import { HiOutlineLink } from "react-icons/hi";
import { useState } from "react";
const LinkButton = () => {
  const [status, setStatus] = useState("Public");

  return (
    <div className="flex  flex-row justify-items-center gap-2">
      <button className="w-32 h-10 text-white bg-blue-700 rounded-md p-2">
        {status}
      </button>
      <button className="bg-blue-800 rounded-md p-2">
        <HiOutlineLink size={25} color="white" />
      </button>
    </div>
  );
};

export default LinkButton;
