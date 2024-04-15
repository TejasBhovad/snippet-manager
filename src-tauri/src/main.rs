// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet, add_file, get_files,rename_file,delete_file,update_file,create_directory,delete_directory,rename_directory,update_directory,get_directories,get_file_content_by_path])
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
        let content = match std::fs::read(&path) {
          Ok(bytes) => match String::from_utf8(bytes) {
            Ok(s) => s,
            Err(_) => "<non-UTF8 data>".to_string(),
          },
          Err(_) => "<unable to read file>".to_string(),
        };
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
fn update_file(file_path: &str, file_content: &str) -> String {
  let path = std::path::Path::new(file_path);
  if path.exists() {
    std::fs::write(&path, file_content).expect("Unable to write file");
    return format!("File {} updated successfully", file_path);
  }
  format!("File {} does not exist", file_path)
}
 
// create directory
#[tauri::command]
fn create_directory(dir_name: &str, app_dir:&str) ->String {
  let dir_path = std::path::Path::new(app_dir).join(dir_name);
  if dir_path.exists() {
    return format!("Directory {} already exists", app_dir.to_string() + dir_name)
  }
  std::fs::create_dir_all(&dir_path).expect("Unable to create directory");
  format!("Directory {} created successfully", app_dir.to_string() + dir_name)
}

// delete directory
#[tauri::command]
fn delete_directory(dir_name: &str, app_dir:&str) ->String {
  let dir_path = std::path::Path::new(app_dir).join(dir_name);
  if dir_path.exists() {
    std::fs::remove_dir_all(&dir_path).expect("Unable to delete directory");
    return format!("Directory {} deleted successfully", app_dir.to_string() + dir_name)
  }
  format!("Directory {} does not exist", app_dir.to_string() + dir_name)
}
 
#[tauri::command]
fn rename_directory(old_dir_name: &str, new_dir_name: &str, app_dir:&str) ->String {
  let olddir_path = std::path::Path::new(app_dir).join(old_dir_name);
  let newdir_path = std::path::Path::new(app_dir).join(new_dir_name); // corrected here
  if olddir_path.exists() {
    std::fs::rename(&olddir_path, &newdir_path).expect("Unable to rename directory");
    return format!("Directory {} renamed to {}", app_dir.to_string() + old_dir_name, app_dir.to_string() + new_dir_name)
  }
  format!("Directory {} does not exist", app_dir.to_string() + old_dir_name)
}

// update directory content
#[tauri::command]
fn update_directory(dir_name: &str, file_name: &str, file_content: &str, app_dir:&str) ->String {
  let dir_path = std::path::Path::new(app_dir).join(dir_name);
  if dir_path.exists() {
    let file_path = dir_path.join(file_name);
    std::fs::write(&file_path, file_content).expect("Unable to write file");
    return format!("File {} created successfully in directory {}", file_name, app_dir.to_string() + dir_name)
  }
  format!("Directory {} does not exist", app_dir.to_string() + dir_name)
}
// func to get directories
#[tauri::command]
fn get_directories(app_dir: &str) -> serde_json::Value {
  let mut dirs = serde_json::Map::new();
  get_all_files_recursive(app_dir, &mut dirs, false);
  serde_json::Value::Object(dirs)
}

fn get_all_files_recursive(dir: &str, dirs: &mut serde_json::Map<String, serde_json::Value>, is_subdir: bool) {
  let path = std::path::Path::new(dir);
  if path.is_dir() {
    let mut files = serde_json::Map::new();
    for entry in std::fs::read_dir(path).expect("Unable to read directory") {
      let entry = entry.expect("Unable to get entry");
      let path = entry.path();
      if path.is_file() {
        let file_name = path.file_name().unwrap().to_string_lossy().to_string();
        // Ignore .DS_Store and other files
        if file_name == ".DS_Store" || file_name.starts_with(".") {
          continue;
        }
        let content = match std::fs::read_to_string(&path) {
          Ok(s) => s,
          Err(_) => "<unable to read file>".to_string(),
        };
        files.insert(file_name, serde_json::Value::String(content));
      } else if path.is_dir() {
        get_all_files_recursive(&path.to_string_lossy(), dirs, true);
      }
    }
    if is_subdir {
      dirs.insert(path.file_name().unwrap().to_string_lossy().to_string(), serde_json::Value::Object(files));
    }
  }
}
// get file content by path
#[tauri::command]
fn get_file_content_by_path(file_path: &str) -> Result<String, String> {
  std::fs::read_to_string(file_path).map_err(|e| e.to_string())
}