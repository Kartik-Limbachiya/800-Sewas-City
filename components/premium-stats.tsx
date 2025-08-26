"use client"

import { useEffect, useState, useRef } from "react"

export default function PremiumStats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ cities: 0, homes: 0, families: 0, employment: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    { label: "Cities Covered", value: 800, suffix: "+", key: "cities" },
    { label: "Homes Delivered", value: 25000, suffix: "+", key: "homes" },
    { label: "Happy Families", value: 15000, suffix: "+", key: "families" },
    { label: "Employment Created", value: 12000, suffix: "+", key: "employment" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat) => {
        let start = 0
        const end = stat.value
        const duration = 2000
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCounts((prev) => ({ ...prev, [stat.key]: end }))
            clearInterval(timer)
          } else {
            setCounts((prev) => ({ ...prev, [stat.key]: Math.floor(start) }))
          }
        }, 16)
      })
    }
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {counts[stat.key as keyof typeof counts].toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-white/90 text-lg font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
