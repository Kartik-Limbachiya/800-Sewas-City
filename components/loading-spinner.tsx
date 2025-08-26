"use client"

import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

export function LoadingSpinner({ size = "md", text, className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <Loader2 className={`animate-spin text-[var(--color-saffron)] ${sizeClasses[size]}`} />
      {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 rounded-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">Loading 800 SEWAS CITY</h2>
          <p className="text-gray-600">Preparing your home ownership journey...</p>
        </div>
      </div>
    </div>
  )
}
