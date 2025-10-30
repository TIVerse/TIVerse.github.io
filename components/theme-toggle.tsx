"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <Button
      variant="ghost"
      size="sm" 
      className="h-9 w-9 relative group hover:bg-muted/50 transition-colors"
      onClick={() => {
        if (theme === "light") setTheme("dark")
        else if (theme === "dark") setTheme("system")
        else setTheme("light")
      }}
    >
      <div className="relative">
        {currentTheme === "light" && <Sun className="h-4 w-4 text-amber-500" />}
        {currentTheme === "dark" && <Moon className="h-4 w-4 text-blue-400" />}
        {theme === "system" && <Monitor className="h-4 w-4 text-emerald-500" />}
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-current opacity-20 scale-0 group-hover:scale-100 transition-transform duration-300" />
      </div>
    </Button>
  )
}