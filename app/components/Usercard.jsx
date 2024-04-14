"use client";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const UserCard = () => {
  const [username, setUsername] = useState("default");
  const [status, setStatus] = useState("online");

  return (
    <div className="flex items-center p-5 bg-util bg-opacity-30 rounded-md w-full h-full">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full flex items-center justify-center">
          <FaUserCircle className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="ml-4 items-center flex flex-col">
        <div className="text-md font-medium text-white">{username}</div>
        <div className="text-sm text-gray-400">{status}</div>
      </div>
    </div>
  );
};

export default UserCard;
