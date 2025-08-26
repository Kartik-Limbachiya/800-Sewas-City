import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import MobileOptimizations from "@/components/mobile-optimizations"
import { Analytics } from "@/components/analytics"
import { ErrorBoundary } from "@/components/error-boundary"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "800 SEWAS CITY - Your Own Home, Your Own Livelihood",
    template: "%s | 800 SEWAS CITY",
  },
  description:
    "A visionary project by SEWAS Federation providing fully-furnished homes and self-employment opportunities for the Jain community across 800 Indian cities. Zero down payment, guaranteed livelihood.",
  keywords: [
    "SEWAS CITY",
    "community housing",
    "Jain community",
    "zero down payment",
    "self employment",
    "furnished homes",
    "housing scheme",
    "India housing project",
    "affordable housing",
    "community development",
  ],
  authors: [{ name: "SEWAS Federation" }],
  creator: "SEWAS Federation",
  publisher: "SEWAS Federation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://800sewascity.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "hi-IN": "/hi-IN",
    },
  },
  openGraph: {
    title: "800 SEWAS CITY - Your Own Home, Your Own Livelihood",
    description:
      "A visionary project by SEWAS Federation providing fully-furnished homes and self-employment opportunities for the Jain community across 800 Indian cities.",
    url: "https://800sewascity.com",
    siteName: "800 SEWAS CITY",
    images: [
      {
        url: "/bright-modern-architectural-rendering-of-a-communi.png",
        width: 1200,
        height: 630,
        alt: "800 SEWAS CITY - Modern Community Housing Project",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "800 SEWAS CITY - Your Own Home, Your Own Livelihood",
    description: "Zero down payment homes with guaranteed self-employment for Jain community across 800 cities.",
    images: ["/bright-modern-architectural-rendering-of-a-communi.png"],
    creator: "@sewascity",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "Real Estate",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#f97316" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "800 SEWAS CITY",
              description: "Community housing project providing homes and self-employment opportunities",
              url: "https://800sewascity.com",
              logo: "https://800sewascity.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-XXXXXXXXXX",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://facebook.com/sewascity",
                "https://twitter.com/sewascity",
                "https://linkedin.com/company/sewascity",
              ],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <MobileOptimizations />
            {children}
            <Toaster />
            <Analytics />
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  )
}
