"use client";
import { createContext, useState, useEffect } from "react";
export const PageContext = createContext();

function ContextProvider({ children }) {
  const [page, setPage] = useState("default");

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}

export default ContextProvider;
