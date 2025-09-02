import Navigation from "@/components/navigation"
import BookingForm from "@/components/booking-form"
import CitySearchMap from "@/components/city-search-map"

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-light-grey)]">
      <Navigation />
      <div className="pt-6">
        <CitySearchMap />
      </div>
      <BookingForm />
    </div>
  )
}
