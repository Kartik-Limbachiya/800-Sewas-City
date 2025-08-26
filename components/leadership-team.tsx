"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Mail } from "lucide-react"

export default function LeadershipTeam() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const leaders = [
    {
      name: "Dr. Rajesh Jain",
      position: "Founder & Chairman",
      image: "/professional-indian-businessman-portrait.png",
      bio: "Visionary leader with 25+ years in community development and social entrepreneurship. Former IAS officer turned social entrepreneur.",
      achievements: ["IAS Officer (Retd.)", "Social Entrepreneur", "Community Leader"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "rajesh@sewascity.com",
      },
    },
    {
      name: "Priya Sharma",
      position: "CEO & Managing Director",
      image: "/professional-indian-businesswoman-portrait.png",
      bio: "Strategic business leader with expertise in large-scale housing projects and sustainable community development across India.",
      achievements: ["MBA Harvard", "Housing Expert", "Sustainability Advocate"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "priya@sewascity.com",
      },
    },
    {
      name: "Amit Patel",
      position: "Head of Operations",
      image: "/senior-indian-executive-portrait.png",
      bio: "Operations excellence expert ensuring seamless delivery of housing projects and self-employment programs across 800+ cities.",
      achievements: ["Operations Expert", "Project Management", "Scale Specialist"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "amit@sewascity.com",
      },
    },
    {
      name: "Dr. Meera Gupta",
      position: "Head of Community Development",
      image: "/indian-woman-professional-portrait.png",
      bio: "Community development specialist focused on creating sustainable livelihoods and fostering entrepreneurship within Jain communities.",
      achievements: ["PhD Social Work", "Community Expert", "Entrepreneur Mentor"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "meera@sewascity.com",
      },
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Leadership That Inspires
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the visionary leaders driving transformation across India's communities.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <Card
              key={index}
              className={`shadow-2xl border-0 bg-white overflow-hidden group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-center space-x-3">
                      <a
                        href={leader.social.linkedin}
                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={leader.social.twitter}
                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${leader.social.email}`}
                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-[var(--color-saffron)] font-semibold mb-3">{leader.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{leader.bio}</p>

                  <div className="space-y-2">
                    {leader.achievements.map((achievement, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
