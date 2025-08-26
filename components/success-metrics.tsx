"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Building, Award, MapPin, Briefcase } from "lucide-react"

export default function SuccessMetrics() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    families: 0,
    cities: 0,
    businesses: 0,
    employment: 0,
    satisfaction: 0,
    revenue: 0,
  })
  const sectionRef = useRef<HTMLElement>(null)

  const metrics = [
    {
      icon: Users,
      label: "Happy Families",
      value: 15000,
      suffix: "+",
      key: "families",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      label: "Cities Covered",
      value: 800,
      suffix: "+",
      key: "cities",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Briefcase,
      label: "Businesses Created",
      value: 12000,
      suffix: "+",
      key: "businesses",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: TrendingUp,
      label: "Employment Generated",
      value: 25000,
      suffix: "+",
      key: "employment",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Award,
      label: "Satisfaction Rate",
      value: 98,
      suffix: "%",
      key: "satisfaction",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Building,
      label: "Revenue Generated",
      value: 500,
      suffix: "Cr+",
      key: "revenue",
      color: "from-indigo-500 to-indigo-600",
    },
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
      metrics.forEach((metric) => {
        let start = 0
        const end = metric.value
        const duration = 2000
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCounts((prev) => ({ ...prev, [metric.key]: end }))
            clearInterval(timer)
          } else {
            setCounts((prev) => ({ ...prev, [metric.key]: Math.floor(start) }))
          }
        }, 16)
      })
    }
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Transforming Lives Across India</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our impact speaks for itself. Join thousands of families who have built their dreams with SEWAS CITY.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <Card
                key={index}
                className={`bg-gradient-to-br ${metric.color} border-0 shadow-2xl transform hover:scale-105 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center text-white">
                  <IconComponent className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <div className="text-4xl lg:text-5xl font-bold mb-2">
                    {metric.key === "revenue" ? "₹" : ""}
                    {counts[metric.key as keyof typeof counts].toLocaleString()}
                    {metric.suffix}
                  </div>
                  <div className="text-lg font-medium opacity-90">{metric.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
