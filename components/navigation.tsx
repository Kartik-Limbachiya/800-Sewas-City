"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import Link from "next/link"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Housing Scheme", href: "#housing" },
    { label: "Self-Employment", href: "#employment" },
    { label: "Partners", href: "#partners" },
  ]

  return (
    <nav
      className={`bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-0"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-tight cursor-pointer">
                800 SEWAS CITY
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side - Language Switcher & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <button className="hover:text-gray-900 transition-colors">English</button>
              <span className="text-gray-400">|</span>
              <button className="hover:text-gray-900 transition-colors">हिंदी</button>
            </div>

            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-[var(--color-saffron)] text-[var(--color-saffron)] hover:bg-[var(--color-saffron)] hover:text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 bg-transparent"
              >
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>

            <Link href="/booking">
              <Button className="bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-hover)] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-all duration-200 active:bg-gray-100 active:scale-98"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 py-3 px-4 border-t border-gray-100 mt-2">
                <button className="hover:text-gray-900 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 active:bg-gray-100">
                  English
                </button>
                <span className="text-gray-400">|</span>
                <button className="hover:text-gray-900 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 active:bg-gray-100">
                  हिंदी
                </button>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="border-[var(--color-saffron)] text-[var(--color-saffron)] hover:bg-[var(--color-saffron)] hover:text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200 w-full bg-transparent active:scale-98"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>

                <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-hover)] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md w-full active:scale-98">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
