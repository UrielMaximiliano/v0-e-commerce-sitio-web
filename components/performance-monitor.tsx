"use client"

import { useEffect } from "react"
import { preloadCriticalResources } from "@/utils/scroll"

export default function PerformanceMonitor() {
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources()

    // Add performance monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            console.log("Page load time:", entry.duration)
          }
        }
      })

      observer.observe({ entryTypes: ["navigation"] })
    }

    // Optimize scroll performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}
