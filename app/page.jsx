"use client";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

const Page = () => {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    invoke("greet", { name: name })
      .then((result) => setGreeting(result))
      .catch(console.error);
  }, [name]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <input
        type="text"
        className="px-4 py-2 mb-4 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h1 className="text-2xl font-bold text-blue-500">{greeting}</h1>
    </div>
  );
};

export default Page;
