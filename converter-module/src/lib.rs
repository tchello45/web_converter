// Copyright © 2025 Tilman Kurmayer. All rights reserved.

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn convert_text_to_binary(text: &str) -> String {
    text.chars()
        .map(|c| format!("{:08b}", c as u8))
        .collect::<Vec<String>>()
        .join(" ")
}

#[wasm_bindgen]
pub fn convert_binary_to_text(binary: &str) -> String {
    binary
        .split(" ")
        .map(|b| String::from_utf8(vec![u8::from_str_radix(b, 2).unwrap() as u8]).unwrap())
        .collect::<Vec<String>>()
        .join("")
}

#[wasm_bindgen]
pub fn convert_text_to_hex(text: &str) -> String {
    text.chars()
        .map(|c| format!("{:02X}", c as u8))
        .collect::<Vec<String>>()
        .join(" ")
}

#[wasm_bindgen]
pub fn convert_hex_to_text(hex: &str) -> String {
    hex.split(" ")
        .map(|h| String::from_utf8(vec![u8::from_str_radix(h, 16).unwrap() as u8]).unwrap())
        .collect::<Vec<String>>()
        .join("")
}

#[wasm_bindgen]
pub fn convert_binary_to_hex(binary: &str) -> String {
    binary
        .split(" ")
        .map(|b| format!("{:02X}", u8::from_str_radix(b, 2).unwrap() as u8))
        .collect::<Vec<String>>()
        .join(" ")
}

#[wasm_bindgen]
pub fn convert_hex_to_binary(hex: &str) -> String {
    hex.split(" ")
        .map(|h| format!("{:08b}", u8::from_str_radix(h, 16).unwrap() as u8))
        .collect::<Vec<String>>()
        .join(" ")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_convert_text_to_binary() {
        assert_eq!(
            convert_text_to_binary("Hello world"),
            "01001000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100"
        );
    }

    #[test]
    fn test_convert_binary_to_text() {
        assert_eq!(
            convert_binary_to_text(
                "01001000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100"
            ),
            "Hello world"
        );
    }

    #[test]
    fn test_convert_text_to_hex() {
        assert_eq!(
            convert_text_to_hex("Hello world"),
            "48 65 6C 6C 6F 20 77 6F 72 6C 64"
        );
    }

    #[test]
    fn test_convert_hex_to_text() {
        assert_eq!(
            convert_hex_to_text("48 65 6C 6C 6F 20 77 6F 72 6C 64"),
            "Hello world"
        );
    }

    #[test]
    fn test_convert_binary_to_hex() {
        assert_eq!(
            convert_binary_to_hex(
                "01001000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100"
            ),
            "48 65 6C 6C 6F 20 77 6F 72 6C 64"
        );
    }

    #[test]
    fn test_convert_hex_to_binary() {
        assert_eq!(
            convert_hex_to_binary("48 65 6C 6C 6F 20 77 6F 72 6C 64"),
            "01001000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100"
        );
    }
}
