"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield, Star, Trophy, CheckCircle, Globe } from "lucide-react"

export default function AwardsCertifications() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const awards = [
    {
      icon: Trophy,
      title: "Best Housing Initiative 2023",
      organization: "National Housing Awards",
      description: "Recognized for innovative community housing solutions",
      year: "2023",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Star,
      title: "Excellence in Social Impact",
      organization: "Social Entrepreneurs Association",
      description: "Outstanding contribution to community development",
      year: "2023",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Award,
      title: "Sustainable Development Leader",
      organization: "UN Habitat India",
      description: "Leadership in sustainable housing and employment",
      year: "2022",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Shield,
      title: "ISO 9001:2015 Certified",
      organization: "International Standards",
      description: "Quality management system certification",
      year: "2022",
      color: "from-purple-500 to-purple-600",
    },
  ]

  const certifications = [
    {
      icon: CheckCircle,
      title: "RERA Approved",
      description: "All projects registered under Real Estate Regulatory Authority",
    },
    {
      icon: Shield,
      title: "Government Recognized",
      description: "Officially recognized by Ministry of Housing & Urban Affairs",
    },
    {
      icon: Globe,
      title: "ISO Certified",
      description: "International quality and environmental management standards",
    },
    {
      icon: Award,
      title: "NABH Accredited",
      description: "Healthcare facilities meet national accreditation standards",
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Awards & Recognition
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to excellence has been recognized by leading organizations across India.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Awards Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Recent Awards</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => {
              const IconComponent = award.icon
              return (
                <Card
                  key={index}
                  className={`shadow-lg border-0 bg-gradient-to-br ${award.color} text-white overflow-hidden transform hover:scale-105 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 opacity-90" />
                    <h4 className="text-lg font-bold mb-2">{award.title}</h4>
                    <p className="text-sm opacity-90 mb-2">{award.organization}</p>
                    <p className="text-xs opacity-80 mb-3">{award.description}</p>
                    <div className="text-sm font-semibold bg-white/20 rounded-full px-3 py-1 inline-block">
                      {award.year}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Certifications & Approvals</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon
              return (
                <Card
                  key={index}
                  className={`shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-saffron)] to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h4>
                    <p className="text-sm text-gray-600">{cert.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
