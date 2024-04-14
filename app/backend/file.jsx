"use client";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appLocalDataDir } from "@tauri-apps/api/path";

export const useFileOperations = () => {
  const [appDir, setAppDir] = useState("");
  appLocalDataDir().then((dir) => {
    setAppDir(dir);
  });

  const createFile = (file_name, file_content) => {
    if (!file_name || !file_content) {
      return;
    }
    return invoke("add_file", {
      fileName: file_name,
      fileContent: file_content,
      appDir: appDir,
    });
  };

  const getFiles = () => {
    return invoke("get_files", {
      appDir: appDir,
    });
  };

  const renameFile = (old_file_name, new_file_name) => {
    return invoke("rename_file", {
      oldFileName: old_file_name,
      newFileName: new_file_name,
      appDir: appDir,
    });
  };

  const deleteFile = (file_name) => {
    return invoke("delete_file", { fileName: file_name, appDir: appDir });
  };

  const updateFile = (file_name, file_content) => {
    return invoke("update_file", {
      fileName: file_name,
      fileContent: file_content,
      appDir: appDir,
    });
  };

  const getAppDir = () => {
    return appDir;
  };

  return {
    createFile,
    getFiles,
    deleteFile,
    renameFile,
    deleteFile,
    updateFile,
    getAppDir,
  };
};
