"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ChevronsUpDown, Check, MapPin } from "lucide-react"

type CityOption = {
  city: string // District column
  state: string // State column
}

async function fetchTSV(path: string): Promise<string> {
  const res = await fetch(path, { cache: "force-cache" })
  if (!res.ok) throw new Error(`Failed to load ${path}`)
  return res.text()
}

function parseCityTSV(tsv: string): CityOption[] {
  // Accepts TSV with headers State<TAB>District (case-insensitive)
  const lines = tsv.split(/\r?\n/).filter(Boolean)
  if (lines.length === 0) return []
  // Try to detect header; if present, skip it
  const [first, ...rest] = lines
  const dataLines = /state/i.test(first) && /district/i.test(first) ? rest : lines

  const rows: CityOption[] = []
  for (const line of dataLines) {
    const [stateRaw, districtRaw] = line.split("\t")
    if (!stateRaw || !districtRaw) continue
    const state = stateRaw.trim()
    const city = districtRaw.trim()
    if (!state || !city) continue
    rows.push({ city, state })
  }
  return rows
}

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim()
}

function uniqueBy<T>(arr: T[], key: (x: T) => string): T[] {
  const seen = new Set<string>()
  const out: T[] = []
  for (const item of arr) {
    const k = key(item)
    if (!seen.has(k)) {
      seen.add(k)
      out.push(item)
    }
  }
  return out
}

export function PreferredCitySelect({
  value,
  onChange,
  placeholder = "Search preferred city...",
  className,
}: {
  value?: string
  onChange: (next: string) => void
  placeholder?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [options, setOptions] = React.useState<CityOption[]>([])
  const [input, setInput] = React.useState("")

  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        const [a, b] = await Promise.all([fetchTSV("/data/cities-a.tsv"), fetchTSV("/data/cities-b.tsv")])
        const parsed = [...parseCityTSV(a), ...parseCityTSV(b)]
        // Deduplicate by "state|city"
        const deduped = uniqueBy(parsed, (r) => `${normalize(r.state)}|${normalize(r.city)}`).sort((x, y) =>
          x.city.localeCompare(y.city),
        )
        if (!cancelled) setOptions(deduped)
      } catch (e) {
        console.error("[v0] preferred-city-select load error:", e)
        if (!cancelled) setOptions([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  // Filter by partial substring on city; show state in the label
  const filtered = React.useMemo(() => {
    const q = normalize(input)
    if (!q) return options
    return options.filter((o) => normalize(o.city).includes(q))
  }, [options, input])

  const selectedLabel = React.useMemo(() => {
    if (!value) return ""
    // value stored as "City — State"
    return value
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <span className="truncate">{selectedLabel || "Select preferred city"}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(32rem,90vw)] p-0">
        <Command shouldFilter={false}>
          <div className="flex items-center gap-2 px-3 pt-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <CommandInput placeholder={placeholder} value={input} onValueChange={setInput} />
          </div>
          <CommandList className="max-h-64">
            {loading ? (
              <CommandEmpty>Loading cities…</CommandEmpty>
            ) : filtered.length === 0 ? (
              <CommandEmpty>No cities found.</CommandEmpty>
            ) : (
              <CommandGroup heading="Cities">
                {filtered.map((opt) => {
                  const label = `${opt.city} — ${opt.state}`
                  const isSelected = value === label
                  return (
                    <CommandItem
                      key={`${opt.state}:${opt.city}`}
                      onSelect={() => {
                        onChange(label)
                        setOpen(false)
                      }}
                      className="cursor-pointer"
                    >
                      <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                      <span className="font-medium">{opt.city}</span>
                      <span className="ml-2 text-muted-foreground">— {opt.state}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
