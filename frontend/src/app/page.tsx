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
import NavBar from "@/components/NavBar";

type ConversionType =
  | "text-to-binary"
  | "binary-to-text"
  | "text-to-hex"
  | "hex-to-text"
  | "binary-to-hex"
  | "hex-to-binary";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
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
    };
    return labels[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <NavBar />

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Free Text, Binary & Hex Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between text, binary, and hexadecimal formats instantly.
            Simple, fast, and reliable conversion tool with real-time results.
            No registration required.
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

        {/* Conversion Type Selection */}
        <div className="mb-8">
          <Label className="text-sm font-medium mb-4 block">
            Conversion Type
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {(
              [
                "text-to-binary",
                "binary-to-text",
                "text-to-hex",
                "hex-to-text",
                "binary-to-hex",
                "hex-to-binary",
              ] as ConversionType[]
            ).map((type) => (
              <Button
                key={type}
                variant={conversionType === type ? "default" : "outline"}
                size="sm"
                onClick={() => handleConversionTypeChange(type)}
                className="text-xs"
              >
                {type.includes("text") && <Type className="h-3 w-3 mr-1" />}
                {type.includes("binary") && !type.includes("text") && (
                  <Binary className="h-3 w-3 mr-1" />
                )}
                {type.includes("hex") && !type.includes("text") && (
                  <Hash className="h-3 w-3 mr-1" />
                )}
                {getConversionTypeLabel(type)}
              </Button>
            ))}
          </div>
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
                  placeholder={`Enter ${conversionType.split("-")[0]} here...`}
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="min-h-[200px] resize-none font-mono text-sm"
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
                  className="min-h-[200px] resize-none font-mono text-sm bg-muted/30"
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
