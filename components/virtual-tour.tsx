"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Maximize2, RotateCcw, Bed, ChefHat, Bath, Sofa } from "lucide-react"

export default function VirtualTour() {
  const [activeRoom, setActiveRoom] = useState("living")
  const [isPlaying, setIsPlaying] = useState(false)

  const rooms = [
    {
      id: "living",
      name: "Living Room",
      icon: Sofa,
      image: "/modern-living-room-with-sofa-and-tv.png",
      description: "Spacious living area with modern furniture and natural lighting",
      features: ["32-inch Smart TV", "Premium Sofa Set", "Air Conditioning", "Large Windows"],
    },
    {
      id: "bedroom1",
      name: "Master Bedroom",
      icon: Bed,
      image: "/modern-master-bedroom-with-king-bed.png",
      description: "Comfortable master bedroom with attached bathroom",
      features: ["King Size Bed", "Wardrobe", "Study Table", "Attached Bathroom"],
    },
    {
      id: "bedroom2",
      name: "Second Bedroom",
      icon: Bed,
      image: "/modern-second-bedroom-with-twin-beds.png",
      description: "Perfect for children or guests",
      features: ["Twin Beds", "Study Area", "Storage Space", "Natural Light"],
    },
    {
      id: "kitchen",
      name: "Kitchen",
      icon: ChefHat,
      image: "/modern-modular-kitchen-with-appliances.png",
      description: "Fully equipped modular kitchen with modern appliances",
      features: ["Modular Design", "Refrigerator", "Microwave", "Gas Stove"],
    },
    {
      id: "bathroom",
      name: "Bathroom",
      icon: Bath,
      image: "/modern-bathroom-with-shower-and-fixtures.png",
      description: "Modern bathroom with premium fixtures",
      features: ["Hot Water", "Premium Fixtures", "Shower", "Storage"],
    },
  ]

  const currentRoom = rooms.find((room) => room.id === activeRoom) || rooms[0]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Virtual Property Tour
          </h2>
          <p className="text-xl text-gray-600">Explore your future home from the comfort of your current one</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Room Navigation */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Rooms</h3>
                <div className="space-y-3">
                  {rooms.map((room) => {
                    const IconComponent = room.icon
                    return (
                      <button
                        key={room.id}
                        onClick={() => setActiveRoom(room.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                          activeRoom === room.id
                            ? "bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 text-white shadow-lg"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{room.name}</span>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tour View */}
          <div className="lg:col-span-3">
            <Card className="shadow-2xl border-0 bg-white overflow-hidden">
              <div className="relative">
                <img
                  src={currentRoom.image || "/placeholder.svg"}
                  alt={currentRoom.name}
                  className="w-full h-96 object-cover"
                />

                {/* Tour Controls Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-white/90 text-gray-900 hover:bg-white rounded-full p-4"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                    <Button size="lg" className="bg-white/90 text-gray-900 hover:bg-white rounded-full p-4">
                      <Maximize2 className="w-6 h-6" />
                    </Button>
                    <Button size="lg" className="bg-white/90 text-gray-900 hover:bg-white rounded-full p-4">
                      <RotateCcw className="w-6 h-6" />
                    </Button>
                  </div>
                </div>

                {/* Room Info Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <currentRoom.icon className="w-5 h-5 text-[var(--color-saffron)]" />
                    <span className="font-semibold text-gray-900">{currentRoom.name}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentRoom.name}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{currentRoom.description}</p>

                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 hover:from-orange-500 hover:to-[var(--color-saffron)] text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Schedule Physical Visit
                    </Button>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Room Features</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {currentRoom.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-[var(--color-saffron)] rounded-full"></div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive Floor Plan */}
        <Card className="mt-12 shadow-2xl border-0 bg-white overflow-hidden">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Interactive Floor Plan</h3>
            <div className="relative bg-gray-100 rounded-2xl p-8 min-h-96 flex items-center justify-center">
              <img
                src="/2bhk-apartment-floor-plan-layout.png"
                alt="Interactive Floor Plan"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />

              {/* Interactive Hotspots */}
              {rooms.map((room, index) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:scale-125 ${
                    activeRoom === room.id ? "bg-[var(--color-saffron)]" : "bg-blue-500"
                  }`}
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + (index % 2) * 20}%`,
                  }}
                >
                  <span className="sr-only">{room.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
