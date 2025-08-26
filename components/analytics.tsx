"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Google Analytics 4
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", {
        page_path: pathname,
      })
    }

    // Facebook Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView")
    }

    // Custom analytics for form interactions
    const trackFormInteraction = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "form_interaction", {
            event_category: "engagement",
            event_label: target.id || target.name || "unknown_field",
          })
        }
      }
    }

    // Track button clicks
    const trackButtonClick = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.tagName === "BUTTON" || target.closest("button")) {
        const button = target.tagName === "BUTTON" ? target : target.closest("button")
        const buttonText = button?.textContent?.trim() || "unknown_button"

        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "button_click", {
            event_category: "engagement",
            event_label: buttonText,
          })
        }
      }
    }

    document.addEventListener("focusin", trackFormInteraction)
    document.addEventListener("click", trackButtonClick)

    return () => {
      document.removeEventListener("focusin", trackFormInteraction)
      document.removeEventListener("click", trackButtonClick)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    // Performance monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            if (window.gtag) {
              window.gtag("event", "LCP", {
                event_category: "performance",
                value: Math.round(entry.startTime),
              })
            }
          }
        }
      })

      observer.observe({ entryTypes: ["largest-contentful-paint"] })

      return () => observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Facebook Pixel */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  )
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}
