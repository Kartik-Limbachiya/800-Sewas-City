import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import KeyFeatures from "@/components/key-features"
import PremiumStats from "@/components/premium-stats"
import PropertyCalculator from "@/components/property-calculator"
import VirtualTour from "@/components/virtual-tour"
import HousingDetails from "@/components/housing-details"
import Testimonials from "@/components/testimonials"
import SuccessMetrics from "@/components/success-metrics"
import LeadershipTeam from "@/components/leadership-team"
import AwardsCertifications from "@/components/awards-certifications"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <KeyFeatures />
      <PremiumStats />
      <PropertyCalculator />
      <VirtualTour />
      <HousingDetails />
      <Testimonials />
      <SuccessMetrics />
      <LeadershipTeam />
      <AwardsCertifications />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-20">
          <section
            id="about"
            className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 shadow-lg border border-gray-100"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              About SEWAS Federation
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              SEWAS Federation is committed to transforming lives through innovative housing solutions and sustainable
              employment opportunities. Our mission extends beyond providing homes - we're building communities that
              thrive.
            </p>
          </section>

          <section
            id="housing"
            className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-12 shadow-lg border border-blue-100"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-6">
              Housing Scheme Excellence
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our comprehensive housing schemes are designed with modern families in mind, featuring state-of-the-art
              amenities and sustainable living solutions across 800+ cities.
            </p>
          </section>

          <section
            id="employment"
            className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-12 shadow-lg border border-green-100"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-900 to-green-700 bg-clip-text text-transparent mb-6">
              Self-Employment Opportunities
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Unlock your potential with our diverse range of work-from-home opportunities, skill development programs,
              and entrepreneurship support designed for sustainable livelihoods.
            </p>
          </section>

          <section
            id="partners"
            className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-12 shadow-lg border border-purple-100"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent mb-6">
              Trusted Partners
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We collaborate with leading organizations, financial institutions, and community leaders to ensure the
              highest standards of service and support for our residents.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
