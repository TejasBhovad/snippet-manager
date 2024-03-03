// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet, add_file, get_files])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
#[tauri::command]
fn greet(name: &str) -> String {
   format!("Hello, {}!", name)
}
// function to create new file
#[tauri::command]
fn add_file(fileName: &str, fileContent: &str, appDir:&str) ->String {
  let filePath = std::path::Path::new(appDir).join(fileName);
  // create the directory if it does not exist
  if let Some(dir) = filePath.parent() {
    std::fs::create_dir_all(dir).expect("Unable to create directory");
  }
  // save the file
  if filePath.exists() {
    return format!("File {} already exists", appDir.to_string() + fileName)
  }
  std::fs::write(&filePath, fileContent).expect("Unable to write file");
  format!("File {} created successfully", appDir.to_string() + fileName)
}

// function to return all files and their content as object
#[tauri::command]
fn get_files(appDir:&str) -> serde_json::Value {
  let mut files = serde_json::Map::new();
  let path = std::path::Path::new(appDir);
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
 