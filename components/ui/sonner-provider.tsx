"use client"

import { Toaster as SonnerToaster } from "sonner"
import { useTheme } from "next-themes"

export function SonnerProvider() {
  const { theme = "system" } = useTheme()

  return (
    <SonnerToaster
      theme={theme as "light" | "dark" | "system"}
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
          borderLeftWidth: "6px",
          borderLeftColor: "hsl(var(--accent))",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          fontSize: "1rem",
          fontWeight: "500",
          transform: "scale(1.05)",
          padding: "16px",
        },
        classNames: {
          title: "font-semibold",
          description: "text-sm font-medium",
          actionButton: "bg-accent text-white hover:bg-accent/90",
        },
        duration: 7000,
        // Apply custom styles for different toast types using custom CSS
        // The success and error styles will be handled by CSS in globals.css
      }}
      className="toaster group"
    />
  )
}
