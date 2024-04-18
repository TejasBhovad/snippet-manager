"use client";
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appLocalDataDir } from "@tauri-apps/api/path";

export const useFileOperations = () => {
  const [appDir, setAppDir] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  useEffect(() => {
    if (!isMounted) {
      return;
    }

    appLocalDataDir().then((dir) => {
      setAppDir(dir);
    });
  }, [isMounted]);

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

  const updateFile = (file_path, file_content) => {
    return invoke("update_file", {
      filePath: file_path,
      fileContent: file_content,
    });
  };

  const createDirectory = (dir_name) => {
    return invoke("create_directory", { dirName: dir_name, appDir: appDir });
  };

  const deleteDirectory = (dir_name) => {
    return invoke("delete_directory", { dirName: dir_name, appDir: appDir });
  };

  const renameDirectory = (old_dir_name, new_dir_name) => {
    return invoke("rename_directory", {
      oldDirName: old_dir_name,
      newDirName: new_dir_name,
      appDir: appDir,
    });
  };

  const updateDirectory = (dir_name, file_name, file_content) => {
    return invoke("update_directory", {
      dirName: dir_name,
      fileName: file_name,
      fileContent: file_content,
      appDir: appDir,
    });
  };
  const getDirectories = () => {
    return invoke("get_directories", { appDir: appDir });
  };

  const getAppDir = () => {
    return appDir;
  };

  const getFileContent = (file_path) => {
    return invoke("get_file_content_by_path", {
      filePath: file_path,
      appDir: appDir,
    });
  };
  const addFileInDirectory = (dir_name, file_name, file_content) => {
    return invoke("add_file_in_directory", {
      dirName: dir_name,
      fileName: file_name,
      fileContent: file_content,
      appDir: appDir,
    });
  };

  return {
    createFile,
    getFileContent,
    getFiles,
    deleteFile,
    renameFile,
    deleteFile,
    updateFile,
    getAppDir,
    getDirectories,
    createDirectory,
    deleteDirectory,
    renameDirectory,
    updateDirectory,
    addFileInDirectory,
  };
};
