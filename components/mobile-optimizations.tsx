"use client"

import { useEffect, useState } from "react"

export default function MobileOptimizations() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Detect iOS for specific optimizations
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent))

    // Detect if app is running in standalone mode (PWA)
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches)

    // Prevent zoom on input focus (iOS)
    const preventZoom = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        target.style.fontSize = "16px"
      }
    }

    // Add touch-friendly styles
    document.documentElement.style.setProperty("--touch-target-size", "44px")

    // Optimize scroll behavior
    document.documentElement.style.scrollBehavior = "smooth"

    // Add event listeners
    document.addEventListener("focusin", preventZoom)

    return () => {
      document.removeEventListener("focusin", preventZoom)
    }
  }, [])

  // Add iOS-specific styles
  useEffect(() => {
    if (isIOS) {
      document.documentElement.classList.add("ios")

      // Handle safe area insets
      const style = document.createElement("style")
      style.textContent = `
        .ios {
          --safe-area-inset-top: env(safe-area-inset-top);
          --safe-area-inset-bottom: env(safe-area-inset-bottom);
        }
        .ios .sticky-nav {
          top: var(--safe-area-inset-top, 0);
        }
        .ios .bottom-fixed {
          bottom: var(--safe-area-inset-bottom, 0);
        }
      `
      document.head.appendChild(style)
    }
  }, [isIOS])

  return null
}
