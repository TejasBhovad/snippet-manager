## Snippet manager

## Technologies

- Rust (backend)
- Next.js (frontend)
- TailwindCSS (frontend)
- Tauri (desktop app)

## Features

- Create, edit, delete snippets
- Search snippets
- Import/Export snippets
- Cross-platform
- Responsive design
- Keyboard shortcuts
- Markdown support
- Syntax highlighting

## Setup

### Install Rust
https://www.rust-lang.org/tools/install

### Install Tauri CLI with Cargo (will take time)
```sh 
cargo install tauri-cli
```

```sh
# install dependencies
npm i
# start the app
cargo tauri dev

# build the app
cargo tauri build

# build the app for production
cargo tauri build --release

# build the app for production and package it
cargo tauri build --release --package

```
