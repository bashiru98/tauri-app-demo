// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// import reqwest crate
use reqwest;
use serde::Deserialize;
use serde::Serialize;
use serde_json::Error;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![log_todo, fetch_weather_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn log_todo(added_todo: String) {
    println!("New todo added: {}", added_todo);
}

#[tauri::command(async)]
async fn fetch_weather_data(location: String) -> String {
    // print the location
    println!("Location: {}", &location);
    let url = format!("https://api.openweathermap.org/data/2.5/weather?q={}&appid=5da52fcbdce9c42ee1f76eda6db408d7&units=metric", location);

    let client = reqwest::Client::new();
    let response = client.get(&url).send().await.unwrap();

    if response.status() == 200 {
        // feeling lazy to write the weather data struct so will just pass it as text
        let resp = response.text().await.unwrap();
        resp
    } else {
        let message = format!("error");
        message
    }
}
