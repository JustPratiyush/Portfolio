"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2 max-[400px]:size-10"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] max-[400px]:h-3.5 max-[400px]:w-3.5 text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] max-[400px]:h-3.5 max-[400px]:w-3.5 text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}
