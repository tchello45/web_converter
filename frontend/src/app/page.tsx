/*
 * Copyright © 2025 Tilman Kurmayer. All rights reserved.
 */

"use client";

import { useState } from "react";

import {
  Copy,
  RotateCcw,
  ArrowLeftRight,
  Binary,
  Hash,
  Type,
} from "lucide-react";

import {
  convert_text_to_binary,
  convert_binary_to_text,
  convert_text_to_hex,
  convert_hex_to_text,
  convert_binary_to_hex,
  convert_hex_to_binary,
  convert_int_to_hex,
  convert_hex_to_int,
  convert_int_to_binary,
  convert_binary_to_int,
} from "converter-module";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavBar from "@/components/NavBar";

type ConversionMode = "text" | "integer";

type ConversionType =
  | "text-to-binary"
  | "binary-to-text"
  | "text-to-hex"
  | "hex-to-text"
  | "binary-to-hex"
  | "hex-to-binary"
  | "int-to-hex"
  | "hex-to-int"
  | "int-to-binary"
  | "binary-to-int";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [conversionMode, setConversionMode] = useState<ConversionMode>("text");
  const [conversionType, setConversionType] =
    useState<ConversionType>("text-to-binary");

  const convertText = (text: string, type: ConversionType): string => {
    try {
      switch (type) {
        case "text-to-binary":
          return convert_text_to_binary(text);
        case "binary-to-text":
          return convert_binary_to_text(text);
        case "text-to-hex":
          return convert_text_to_hex(text);
        case "hex-to-text":
          return convert_hex_to_text(text);
        case "binary-to-hex":
          return convert_binary_to_hex(text);
        case "hex-to-binary":
          return convert_hex_to_binary(text);
        case "int-to-hex":
          return convert_int_to_hex(BigInt(text));
        case "hex-to-int":
          return convert_hex_to_int(text).toString();
        case "int-to-binary":
          return convert_int_to_binary(BigInt(text));
        case "binary-to-int":
          return convert_binary_to_int(text).toString();
        default:
          return "";
      }
    } catch (error) {
      return "Invalid input format";
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim()) {
      const result = convertText(value, conversionType);
      setOutput(result);
    } else {
      setOutput("");
    }
  };

  const handleConversionTypeChange = (type: ConversionType) => {
    setConversionType(type);
    if (input.trim()) {
      const result = convertText(input, type);
      setOutput(result);
    }
  };

  const handleConversionModeChange = (mode: ConversionMode) => {
    setConversionMode(mode);
    // Reset to first conversion type of the selected mode
    const defaultType: ConversionType =
      mode === "text" ? "text-to-binary" : "int-to-hex";
    setConversionType(defaultType);
    if (input.trim()) {
      const result = convertText(input, defaultType);
      setOutput(result);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const swapInputOutput = () => {
    const newInput = output;
    const newOutput = input;
    setInput(newInput);
    setOutput(newOutput);

    // Update conversion type to reverse
    const reverseMap: Record<ConversionType, ConversionType> = {
      "text-to-binary": "binary-to-text",
      "binary-to-text": "text-to-binary",
      "text-to-hex": "hex-to-text",
      "hex-to-text": "text-to-hex",
      "binary-to-hex": "hex-to-binary",
      "hex-to-binary": "binary-to-hex",
      "int-to-hex": "hex-to-int",
      "hex-to-int": "int-to-hex",
      "int-to-binary": "binary-to-int",
      "binary-to-int": "int-to-binary",
    };
    setConversionType(reverseMap[conversionType]);
  };

  const getConversionTypeLabel = (type: ConversionType) => {
    const labels: Record<ConversionType, string> = {
      "text-to-binary": "Text → Binary",
      "binary-to-text": "Binary → Text",
      "text-to-hex": "Text → Hex",
      "hex-to-text": "Hex → Text",
      "binary-to-hex": "Binary → Hex",
      "hex-to-binary": "Hex → Binary",
      "int-to-hex": "Int → Hex",
      "hex-to-int": "Hex → Int",
      "int-to-binary": "Int → Binary",
      "binary-to-int": "Binary → Int",
    };
    return labels[type];
  };

  const getAvailableConversions = (mode: ConversionMode): ConversionType[] => {
    if (mode === "text") {
      return [
        "text-to-binary",
        "binary-to-text",
        "text-to-hex",
        "hex-to-text",
        "binary-to-hex",
        "hex-to-binary",
      ];
    } else {
      return ["int-to-hex", "hex-to-int", "int-to-binary", "binary-to-int"];
    }
  };

  const getInputPlaceholder = (type: ConversionType): string => {
    const placeholders: Record<ConversionType, string> = {
      "text-to-binary": "Enter text here...\nExample: Hello World",
      "binary-to-text":
        "Enter binary here...\nExample: 01001000 01100101 01101100 01101100 01101111",
      "text-to-hex": "Enter text here...\nExample: Hello World",
      "hex-to-text": "Enter hex here...\nExample: 48 65 6C 6C 6F",
      "binary-to-hex":
        "Enter binary here...\nExample: 01001000 01100101 01101100",
      "hex-to-binary": "Enter hex here...\nExample: 48 65 6C",
      "int-to-hex": "Enter integer here...\nExample: 255, -1, 1024",
      "hex-to-int": "Enter hex here...\nExample: FF, 0xFF, DEADBEEF",
      "int-to-binary": "Enter integer here...\nExample: 42, -10, 1000",
      "binary-to-int": "Enter binary here...\nExample: 1010, 11111111, 101010",
    };
    return placeholders[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <NavBar />

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Free Text & Integer Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between text, integers, binary, and hexadecimal formats
            instantly. Simple, fast, and reliable conversion tool with real-time
            results. No registration required.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            <span className="inline-block bg-muted/50 px-3 py-1 rounded-full mr-2 mb-2">
              ✨ Real-time conversion
            </span>
            <span className="inline-block bg-muted/50 px-3 py-1 rounded-full mr-2 mb-2">
              🚀 WebAssembly powered
            </span>
            <span className="inline-block bg-muted/50 px-3 py-1 rounded-full mr-2 mb-2">
              🔒 Privacy-focused
            </span>
            <span className="inline-block bg-muted/50 px-3 py-1 rounded-full mr-2 mb-2">
              📱 Mobile friendly
            </span>
          </div>
        </header>

        {/* Conversion Selection */}
        <div className="mb-8">
          <Label className="text-sm font-medium mb-4 block">
            Choose Conversion
          </Label>

          {/* Mode Selection */}
          <div className="mb-6">
            <Select
              value={conversionMode}
              onValueChange={handleConversionModeChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select conversion mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Text Conversion
                  </div>
                </SelectItem>
                <SelectItem value="integer">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Integer Conversion
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Conversion Types Grid */}
          {conversionMode === "text" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* Text to Others */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  From Text
                </h4>
                <div className="space-y-1">
                  <Button
                    variant={
                      conversionType === "text-to-binary"
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handleConversionTypeChange("text-to-binary")}
                    className="w-full justify-start text-xs"
                  >
                    <Type className="h-3 w-3 mr-2" />
                    Text → Binary
                  </Button>
                  <Button
                    variant={
                      conversionType === "text-to-hex" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleConversionTypeChange("text-to-hex")}
                    className="w-full justify-start text-xs"
                  >
                    <Type className="h-3 w-3 mr-2" />
                    Text → Hex
                  </Button>
                </div>
              </div>

              {/* To Text */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  To Text
                </h4>
                <div className="space-y-1">
                  <Button
                    variant={
                      conversionType === "binary-to-text"
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handleConversionTypeChange("binary-to-text")}
                    className="w-full justify-start text-xs"
                  >
                    <Binary className="h-3 w-3 mr-2" />
                    Binary → Text
                  </Button>
                  <Button
                    variant={
                      conversionType === "hex-to-text" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleConversionTypeChange("hex-to-text")}
                    className="w-full justify-start text-xs"
                  >
                    <Hash className="h-3 w-3 mr-2" />
                    Hex → Text
                  </Button>
                </div>
              </div>

              {/* Binary ↔ Hex */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Binary ↔ Hex
                </h4>
                <div className="space-y-1">
                  <Button
                    variant={
                      conversionType === "binary-to-hex" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleConversionTypeChange("binary-to-hex")}
                    className="w-full justify-start text-xs"
                  >
                    <Binary className="h-3 w-3 mr-2" />
                    Binary → Hex
                  </Button>
                  <Button
                    variant={
                      conversionType === "hex-to-binary" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleConversionTypeChange("hex-to-binary")}
                    className="w-full justify-start text-xs"
                  >
                    <Hash className="h-3 w-3 mr-2" />
                    Hex → Binary
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
              {/* Integer to Others */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  From Integer
                </h4>
                <div className="space-y-1">
                  <Button
                    variant={
                      conversionType === "int-to-hex" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleConversionTypeChange("int-to-hex")}
                    className="w-full justify-start text-xs"
                  >
                    <Type className="h-3 w-3 mr-2" />
                    Int → Hex
                  </Button>
                  <Button
                    variant={
                      conversionType === "int-to-binary" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleConversionTypeChange("int-to-binary")}
                    className="w-full justify-start text-xs"
                  >
                    <Type className="h-3 w-3 mr-2" />
                    Int → Binary
                  </Button>
                </div>
              </div>

              {/* To Integer */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  To Integer
                </h4>
                <div className="space-y-1">
                  <Button
                    variant={
                      conversionType === "hex-to-int" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleConversionTypeChange("hex-to-int")}
                    className="w-full justify-start text-xs"
                  >
                    <Hash className="h-3 w-3 mr-2" />
                    Hex → Int
                  </Button>
                  <Button
                    variant={
                      conversionType === "binary-to-int" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleConversionTypeChange("binary-to-int")}
                    className="w-full justify-start text-xs"
                  >
                    <Binary className="h-3 w-3 mr-2" />
                    Binary → Int
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Converter Card */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  {getConversionTypeLabel(conversionType)}
                </CardTitle>
                <CardDescription>
                  Enter your {conversionType.split("-")[0]} to convert to{" "}
                  {conversionType.split("-")[2]}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={swapInputOutput}
                  disabled={!output}
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  disabled={!input && !output}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="input" className="text-sm font-medium">
                    Input ({conversionType.split("-")[0]})
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(input)}
                    disabled={!input}
                    className="h-6 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <Textarea
                  id="input"
                  placeholder={getInputPlaceholder(conversionType)}
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="min-h-[200px] max-h-[300px] resize-none font-mono text-sm"
                />
              </div>

              {/* Output */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="output" className="text-sm font-medium">
                    Output ({conversionType.split("-")[2]})
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(output)}
                    disabled={!output}
                    className="h-6 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <Textarea
                  id="output"
                  placeholder="Converted result will appear here..."
                  value={output}
                  readOnly
                  className="min-h-[200px] max-h-[300px] resize-none font-mono text-sm bg-muted/30"
                />
              </div>
            </div>

            {/* Stats */}
            {(input || output) && (
              <div className="flex justify-center gap-8 pt-4 border-t text-sm text-muted-foreground">
                <div>Input: {input.length} chars</div>
                <div>Output: {output.length} chars</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center mt-16 text-sm text-muted-foreground">
          <p>Built with Rust, WASM, Next.js, Tailwind CSS, and shadcn/ui</p>
          <p className="mt-2">
            © 2025 Tilman Kurmayer. Free online text conversion tool.
          </p>
        </footer>
      </main>
    </div>
  );
}
