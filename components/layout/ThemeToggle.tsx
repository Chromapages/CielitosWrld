"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useHaptics } from "@/hooks/useHaptics"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    const { triggerLight } = useHaptics();

    // Avoid hydration mismatch by only rendering after mounting
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="size-11 rounded-full" />
    }

    const handleToggle = () => {
        triggerLight();
        const nextTheme = resolvedTheme === "light" ? "dark" : "light";
        setTheme(nextTheme);
    };

    return (
        <button
            onClick={handleToggle}
            className="btn-press group relative flex size-11 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800/60 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
