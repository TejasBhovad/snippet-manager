"use client";
import React from "react";
import { useState } from "react";
const VisibilityFilter = () => {
  const [filter, setFilter] = useState("default");
  return (
    <div className="flex flex-row w-full px-4 gap-2">
      <button
        onClick={() => setFilter(filter === "public" ? "default" : "public")}
        className={`w-1/2 bg-util rounded-md py-2 text-white px-4 text-sm ${
          filter === "public" ? "bg-util" : "bg-util opacity-50"
        }`}
      >
        Public
      </button>
      <button
        onClick={() => setFilter(filter === "locked" ? "default" : "locked")}
        className={`w-1/2 bg-util rounded-md py-2 text-white px-4 text-sm ${
          filter === "locked" ? "bg-util" : "bg-util opacity-50"
        }`}
      >
        Locked
      </button>
    </div>
  );
};

export default VisibilityFilter;
