"use client"

import { useEffect } from "react"

interface ToastProps {
  message: string
  type: "success" | "error"
  visible: boolean
  onClose: () => void
}

export default function Toast({ message, type, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg transition-all duration-300 transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}
    >
      {message}
    </div>
  )
}
