"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${scrollY * (isMobile ? 0.2 : 0.5)}px)`,
          willChange: "transform",
        }}
      >
        <img
          src="/bright-modern-architectural-rendering-of-a-communi.png"
          alt="Modern community housing project architectural rendering"
          className="w-full h-[120%] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className={`bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/20 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Your Own Home,{" "}
              <span className="bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 bg-clip-text text-transparent">
                Your Own Livelihood
              </span>
            </h1>

            <p
              className={`text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              A visionary project by SEWAS Federation to provide fully-furnished homes and self-employment for the Jain
              community across 800 Indian cities
            </p>

            <div
              className={`transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 hover:from-orange-500 hover:to-[var(--color-saffron)] text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 active:scale-95 relative overflow-hidden group w-full sm:w-auto"
                asChild
              >
                <a href="/booking" className="relative z-10 block">
                  <span className="relative z-10">Apply Now</span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer p-2"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <div className="w-8 h-12 border-2 border-white/80 rounded-full flex justify-center backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 active:scale-95">
          <ChevronDown className="w-4 h-4 text-white mt-2 animate-pulse" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
