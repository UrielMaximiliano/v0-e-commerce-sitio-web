"use client"

import { memo } from "react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const LoadingSpinner = memo(function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  // SRP: solo muestra el spinner
  // OCP: fácil de extender con más tamaños o estilos
  // ISP: props claros y específicos
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]} ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
})

export default LoadingSpinner
