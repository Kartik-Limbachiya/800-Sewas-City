"use client"

import { Home, Sofa, Briefcase, Building2 } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function KeyFeatures() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const features = [
    {
      icon: Home,
      title: "0% Down Payment",
      description: "Start your homeownership journey with zero initial investment.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Sofa,
      title: "Fully Furnished Homes",
      description: "Move in with just your clothes, everything else is taken care of.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Briefcase,
      title: "Guaranteed Self-Employment",
      description: "Access a wide range of work-from-home opportunities.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Building2,
      title: "Jain Community Hub",
      description: "Live in a city with a Jain Temple, Hospital, and University.",
      color: "from-[var(--color-saffron)] to-orange-500",
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

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-saffron) 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            An All-Inclusive Life Awaits
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className={`text-center group transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                  <div className="flex justify-center mb-6">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg relative`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-saffron)] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
