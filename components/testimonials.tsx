"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Home, Users } from "lucide-react"

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      image: "/happy-indian-family-in-new-home.png",
      text: "SEWAS CITY transformed our lives completely. We got our dream 3 BHK home with zero down payment and I started my own tailoring business from home. The community support is incredible!",
      homeType: "3 BHK",
      businessType: "Tailoring Business",
      monthlyIncome: "₹45,000",
    },
    {
      id: 2,
      name: "Rajesh Patel",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      image: "/successful-businessman-at-home-office.png",
      text: "The self-employment program helped me establish my digital marketing agency. Living in SEWAS CITY with like-minded entrepreneurs has been a game-changer for my business growth.",
      homeType: "2 BHK",
      businessType: "Digital Marketing",
      monthlyIncome: "₹65,000",
    },
    {
      id: 3,
      name: "Meera Jain",
      location: "Pune, Maharashtra",
      rating: 5,
      image: "/woman-entrepreneur-working-from-home.png",
      text: "From a small apartment to owning a fully furnished home and running my online jewelry business - SEWAS CITY made it all possible. The Jain community here feels like family.",
      homeType: "3 BHK",
      businessType: "Online Jewelry",
      monthlyIncome: "₹55,000",
    },
    {
      id: 4,
      name: "Amit Kumar",
      location: "Jaipur, Rajasthan",
      rating: 5,
      image: "/young-professional-in-modern-apartment.png",
      text: "The entire process was transparent and supportive. Within 6 months, I had my own home and a thriving consulting business. The community infrastructure is world-class.",
      homeType: "2 BHK",
      businessType: "Business Consulting",
      monthlyIncome: "₹70,000",
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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, var(--color-saffron) 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Success Stories That Inspire
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real families, real transformations. Discover how SEWAS CITY has changed lives across India.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="mx-4 shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid lg:grid-cols-2 gap-0">
                        <div className="relative h-96 lg:h-auto">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={`${testimonial.name} success story`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-6 left-6 text-white">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{testimonial.location}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                <span>{testimonial.homeType}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{testimonial.businessType}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <div className="mb-6">
                            <Quote className="w-12 h-12 text-[var(--color-saffron)] mb-4" />
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">{testimonial.text}</p>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>

                            <div>
                              <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                              <p className="text-gray-600">{testimonial.location}</p>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                              <p className="text-sm text-green-800 font-medium">Monthly Income Achievement</p>
                              <p className="text-2xl font-bold text-green-900">{testimonial.monthlyIncome}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-[var(--color-saffron)] scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
