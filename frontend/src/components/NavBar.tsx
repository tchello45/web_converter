"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Binary, Moon, Sun, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Binary className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Web Converter</h1>
            <p className="text-sm text-muted-foreground">Text • Binary • Hex</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(
                theme === "light"
                  ? "dark"
                  : theme === "dark"
                  ? "system"
                  : "light"
              )
            }
          >
            {mounted && theme === "light" && <Sun className="h-4 w-4" />}
            {mounted && theme === "dark" && <Moon className="h-4 w-4" />}
            {mounted && theme === "system" && <Monitor className="h-4 w-4" />}
            {!mounted && <Monitor className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
