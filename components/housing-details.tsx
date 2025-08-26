import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

export default function HousingDetails() {
  const housingOptions = [
    {
      id: 1,
      title: "2 BHK - 540 sq. ft. Super Built-up",
      image: "/modern-2bhk-apartment-interior-with-furnished-livi.png",
      features: ["Fully Furnished", "2 Bedrooms", "Modern Kitchen", "Ideal for Small Families"],
    },
    {
      id: 2,
      title: "3 BHK - 720 sq. ft. Super Built-up",
      image: "/spacious-3bhk-apartment-interior-with-large-living.png",
      features: ["Fully Furnished", "3 Bedrooms", "Spacious Living Area", "Perfect for Growing Families"],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Future Home</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {housingOptions.map((option) => (
            <Card
              key={option.id}
              className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-64 w-full">
                <Image src={option.image || "/placeholder.svg"} alt={option.title} fill className="object-cover" />
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{option.title}</h3>

                <ul className="space-y-3 mb-6">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[var(--color-saffron)] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-[var(--color-saffron)] text-[var(--color-saffron)] hover:bg-[var(--color-saffron)] hover:text-white transition-colors duration-300 bg-transparent"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
