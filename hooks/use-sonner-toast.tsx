"use client"

import { toast as sonnerToast } from "sonner"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  title?: string
  description?: string
  type?: ToastType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export function useSonnerToast() {
  const toast = ({ title, description, type = "info", duration = 5000, action }: ToastOptions) => {
    const toastFn =
      type === "error"
        ? sonnerToast.error
        : type === "success"
          ? sonnerToast.success
          : type === "warning"
            ? sonnerToast.warning
            : sonnerToast

    if (action) {
      return toastFn(title, {
        description,
        duration,
        action: {
          label: action.label,
          onClick: action.onClick,
        },
      })
    }

    return toastFn(title, {
      description,
      duration,
    })
  }

  return { toast }
}
