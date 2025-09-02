"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"

type StateCities = Record<string, string[]>

type ParsedData = {
  states: StateCities
  allCities: { city: string; state: string }[]
  stateNames: string[]
}

const KNOWN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

// Normalize for case-insensitive, punctuation-insensitive matching
function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N} ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// Remove any parenthetical abbreviations like "Maharashtra (MH)" → "Maharashtra"
function stripParen(s: string) {
  return s.replace(/$$.*?$$/g, "").trim()
}

function isStateHeader(line: string) {
  const clean = stripParen(line)
  const n = normalize(clean)
  return KNOWN_STATES.some((st) => normalize(st) === n)
}

function canonicalStateName(line: string): string | null {
  const clean = stripParen(line)
  const n = normalize(clean)
  return KNOWN_STATES.find((st) => normalize(st) === n) || null
}

// Load and parse TSV: "State\tDistrict"
async function loadAndParseTSVFiles(paths: string[]): Promise<ParsedData> {
  const texts = await Promise.all(
    paths.map(async (p) => {
      const r = await fetch(p)
      return r.ok ? r.text() : Promise.resolve("")
    }),
  )

  const states: StateCities = {}
  for (const text of texts) {
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim()
      if (!line || /^state\s+district$/i.test(line)) continue
      const parts = line.split(/\t+/)
      if (parts.length < 2) continue
      const state = stripParen(parts[0]).trim()
      const district = parts.slice(1).join(" ").trim() // in case extra tabs exist
      if (!state || !district) continue
      if (!states[state]) states[state] = []
      states[state].push(district)
    }
  }

  // de-duplicate and sort each state's cities
  for (const st of Object.keys(states)) {
    states[st] = Array.from(new Set(states[st])).sort((a, b) => a.localeCompare(b))
  }

  const allCities: { city: string; state: string }[] = []
  const stateNames = Object.keys(states).sort((a, b) => a.localeCompare(b))
  for (const st of stateNames) {
    for (const c of states[st]) {
      allCities.push({ city: c, state: st })
    }
  }
  return { states, allCities, stateNames }
}

// Dynamic import Leaflet parts only on client
const MapContainer = dynamic(async () => (await import("react-leaflet")).MapContainer, { ssr: false })
const TileLayer = dynamic(async () => (await import("react-leaflet")).TileLayer, { ssr: false })
const Marker = dynamic(async () => (await import("react-leaflet")).Marker, { ssr: false })
const Popup = dynamic(async () => (await import("react-leaflet")).Popup, { ssr: false })

type LatLng = { lat: number; lon: number; label: string }

function getGeoCache(key: string) {
  try {
    const raw = localStorage.getItem("geo-cache")
    const data = raw ? (JSON.parse(raw) as Record<string, { lat: number; lon: number }>) : {}
    return data[key] || null
  } catch {
    return null
  }
}

function setGeoCache(key: string, val: { lat: number; lon: number }) {
  try {
    const raw = localStorage.getItem("geo-cache")
    const data = raw ? (JSON.parse(raw) as Record<string, { lat: number; lon: number }>) : {}
    data[key] = val
    localStorage.setItem("geo-cache", JSON.stringify(data))
  } catch {
    /* noop */
  }
}

async function geocodePlace(q: string): Promise<{ lat: number; lon: number } | null> {
  const key = q.toLowerCase()
  const hit = getGeoCache(key)
  if (hit) return hit
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&addressdetails=0&q=${encodeURIComponent(
      q,
    )}`
    const res = await fetch(url, {
      headers: { "Accept-Language": "en", "User-Agent": "sewascity/1.0" },
    })
    if (!res.ok) return null
    const data = (await res.json()) as Array<{ lat: string; lon: string }>
    if (!data?.length) return null
    const geo = { lat: Number.parseFloat(data[0].lat), lon: Number.parseFloat(data[0].lon) }
    setGeoCache(key, geo)
    return geo
  } catch {
    return null
  }
}

export default function CitySearchMap() {
  const [query, setQuery] = useState<string>("")
  const [parsed, setParsed] = useState<ParsedData | null>(null)
  const [markers, setMarkers] = useState<LatLng[]>([])
  const [loadingPins, setLoadingPins] = useState(false)
  const mapRef = useRef<any>(null)

  // Load two TSV files instead of a single text file
  useEffect(() => {
    async function load() {
      const data = await loadAndParseTSVFiles(["/data/districts-west.tsv", "/data/districts-east.tsv"])
      setParsed(data)
    }
    load()
  }, [])

  // Compute suggestions for partial city match and exact state match
  const suggestions = useMemo(() => {
    if (!parsed) return { cities: [] as { city: string; state: string }[], matchedState: null as string | null }
    const q = normalize(query)
    if (!q) return { cities: [], matchedState: null }

    const matchedState =
      parsed.stateNames.find((st) => normalize(st) === q) ||
      // also accept with parentheses entered by user, e.g. "maharashtra (mh)"
      parsed.stateNames.find((st) => normalize(stripParen(st)) === q) ||
      null

    // Partial city match across all cities, limited to 12
    const cities = parsed.allCities.filter(({ city }) => normalize(city).includes(q)).slice(0, 12)
    return { cities, matchedState }
  }, [parsed, query])

  async function pinCity(city: string, state: string) {
    setLoadingPins(true)
    const geo = await geocodePlace(`${city}, ${state}, India`)
    setLoadingPins(false)
    if (geo) {
      const m: LatLng = { lat: geo.lat, lon: geo.lon, label: `${city}, ${state}` }
      setMarkers([m])
      if (mapRef.current?.setView) mapRef.current.setView([m.lat, m.lon], 10)
    }
  }

  async function pinAllInState(state: string) {
    if (!parsed) return
    const cities = parsed.states[state] || []
    if (!cities.length) return
    setLoadingPins(true)
    const acc: LatLng[] = []

    for (const city of cities) {
      const geo = await geocodePlace(`${city}, ${state}, India`)
      if (geo) acc.push({ lat: geo.lat, lon: geo.lon, label: `${city}, ${state}` })
      // Throttle to be respectful to the geocoding API
      await new Promise((r) => setTimeout(r, 350))
    }

    setMarkers(acc)
    setLoadingPins(false)

    // Fit bounds if we have multiple markers
    if (acc.length > 1 && (window as any).L && mapRef.current) {
      const L = (window as any).L
      const bounds = L.latLngBounds(acc.map((p) => [p.lat, p.lon]))
      mapRef.current.fitBounds(bounds, { padding: [32, 32] })
    }
  }

  const isMatchedState = !!suggestions.matchedState

  return (
    <section className="w-full mt-10">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <header className="mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-pretty">Find and Pin Your City</h2>
          <p className="text-muted-foreground mt-1">
            Type a city name for quick match (e.g., “mumbai”) or a state to pin all its cities (e.g., “maharashtra”).
          </p>
        </header>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city (e.g., mumbai) or state (e.g., maharashtra)"
              className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#E67E22]"
              aria-label="Search city or state"
            />
            <button
              onClick={() => {
                if (suggestions.matchedState) pinAllInState(suggestions.matchedState)
              }}
              disabled={!isMatchedState || loadingPins}
              className={`rounded-md px-4 py-2 text-white transition ${
                isMatchedState ? "bg-[#E67E22] hover:opacity-90" : "bg-gray-300"
              }`}
              aria-disabled={!isMatchedState || loadingPins}
            >
              {loadingPins
                ? "Pinning..."
                : suggestions.matchedState
                  ? `Pin all in ${suggestions.matchedState}`
                  : "Pin all in state"}
            </button>
          </div>

          {/* Suggestions list */}
          {query && suggestions.cities.length > 0 && (
            <div className="rounded-md border border-gray-200 bg-white p-3">
              <p className="text-sm font-medium mb-2">Matches</p>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                {suggestions.cities.map(({ city, state }) => (
                  <li key={`${state}-${city}`}>
                    <button
                      onClick={() => pinCity(city, state)}
                      className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-50 border border-transparent hover:border-gray-200"
                      aria-label={`Pin ${city}, ${state}`}
                    >
                      <span className="font-medium">{city}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        {" — "} {state}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Map */}
          <div className="h-[360px] w-full overflow-hidden rounded-md border border-gray-200">
            <ClientLeafletMap markers={markers} mapRef={mapRef} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ClientLeafletMap({ markers, mapRef }: { markers: LatLng[]; mapRef: any }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      // Inject Leaflet CSS once
      if (!document.querySelector('link[data-leaflet-css="true"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        link.setAttribute("data-leaflet-css", "true")
        document.head.appendChild(link)
      }
      if (!(window as any).L) {
        await import("leaflet")
      }
      const L = (window as any).L
      // Fix default marker icons
      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })
      L.Marker.prototype.options.icon = icon
      setIsReady(true)
    })()
  }, [])

  if (!isReady) {
    return (
      <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">Loading map…</div>
    )
  }

  return (
    <MapContainer
      // Use whenCreated to capture the map instance (works in react-leaflet v3/v4)
      whenCreated={(map) => {
        mapRef.current = map
      }}
      center={[20.5937, 78.9629]}
      zoom={5}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m) => (
        <Marker key={`${m.lat}-${m.lon}-${m.label}`} position={[m.lat, m.lon]}>
          <Popup>{m.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
