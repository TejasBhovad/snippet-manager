// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet, add_file, get_files,rename_file,delete_file,update_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
#[tauri::command]
fn greet(name: &str) -> String {
   format!("Hello, {}!", name)
}
// function to create new file
#[tauri::command]
fn add_file(file_name: &str, file_content: &str, app_dir:&str) ->String {
  let file_path = std::path::Path::new(app_dir).join(file_name);
 
  if let Some(dir) = file_path.parent() {
    std::fs::create_dir_all(dir).expect("Unable to create directory");
  }
  if file_path.exists() {
    return format!("File {} already exists", app_dir.to_string() + file_name)
  }
  std::fs::write(&file_path, file_content).expect("Unable to write file");
  format!("File {} created successfully", app_dir.to_string() + file_name)
}

// function to return all files and their content as object
#[tauri::command]
fn get_files(app_dir:&str) -> serde_json::Value {
  format!("Reading files from {}", app_dir);
  let mut files = serde_json::Map::new();
  let path = std::path::Path::new(app_dir);
  if path.is_dir() {
    for entry in std::fs::read_dir(path).expect("Unable to read directory") {
      let entry = entry.expect("Unable to get entry");
      let path = entry.path();
      if path.is_file() {
        let content = std::fs::read_to_string(&path).expect("Unable to read file");
        files.insert(path.file_name().unwrap().to_string_lossy().to_string(), serde_json::Value::String(content));
      }
    }
  }
  serde_json::Value::Object(files)
}
 
// function to rename file
#[tauri::command]
fn rename_file(old_file_name: &str, new_file_name: &str, app_dir:&str) ->String {
  let oldfile_path = std::path::Path::new(app_dir).join(old_file_name);
  let newfile_path = std::path::Path::new(app_dir).join(new_file_name);
  if oldfile_path.exists() {
    std::fs::rename(&oldfile_path, &newfile_path).expect("Unable to rename file");
    return format!("File {} renamed to {}", app_dir.to_string() + old_file_name, app_dir.to_string() + new_file_name)
  }
  format!("File {} does not exist", app_dir.to_string() + old_file_name)
}

// function to delete file
#[tauri::command]
fn delete_file(file_name: &str, app_dir:&str) ->String {
  let file_path = std::path::Path::new(app_dir).join(file_name);
  if file_path.exists() {
    std::fs::remove_file(&file_path).expect("Unable to delete file");
    return format!("File {} deleted successfully", app_dir.to_string() + file_name)
  }
  format!("File {} does not exist", app_dir.to_string() + file_name)
}

// update file content
#[tauri::command]
fn update_file(file_name: &str, file_content: &str, app_dir:&str) ->String {
  let file_path = std::path::Path::new(app_dir).join(file_name);
  if file_path.exists() {
    std::fs::write(&file_path, file_content).expect("Unable to write file");
    return format!("File {} updated successfully", app_dir.to_string() + file_name)
  }
  format!("File {} does not exist", app_dir.to_string() + file_name)
}
 
 
