import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Web Converter - Free Text, Binary & Hex Converter Tool",
    template: "%s | Web Converter",
  },
  description:
    "Free online converter tool for text, binary, and hexadecimal formats. Convert text to binary, hex to text, binary to hex instantly with real-time results. No registration required.",
  keywords: [
    "text converter",
    "binary converter",
    "hex converter",
    "hexadecimal converter",
    "text to binary",
    "binary to text",
    "text to hex",
    "hex to text",
    "binary to hex",
    "hex to binary",
    "online converter",
    "free converter tool",
    "encoding decoder",
    "ascii converter",
    "wasm converter",
  ],
  authors: [{ name: "Tilman Kurmayer" }],
  creator: "Tilman Kurmayer",
  publisher: "Tilman Kurmayer",
  applicationName: "Tilman Kurmayer",
  category: "Developer Tools",
  classification: "Utility",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
