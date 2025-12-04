"use client"

import { useEffect, useRef, useState } from "react"
import { useAudio } from "./audio-player"

type DeezerTrack = {
  id: number
  title: string
  artist: { name: string }
  album: { cover_small?: string }
  preview?: string
}

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<DeezerTrack[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounceRef = useRef<number | null>(null)
  const audio = useAudio()

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    if (!query || query.length < 2) {
      setResults([])
      setOpen(false)
      return
    }

    setLoading(true)
    // debounce
    // @ts-ignore setTimeout return
    debounceRef.current = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/deezer?q=${encodeURIComponent(query)}`)
        if (!res.ok) {
          setResults([])
          setOpen(false)
          setLoading(false)
          return
        }
        const data = await res.json()
        setResults(data.data || [])
        setOpen(true)
      } catch (err) {
        setResults([])
        setOpen(false)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  }, [query])

  return (
    <div className="relative w-full max-w-md">
      <label className="sr-only">Search</label>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tracks, artists or albums..."
        className="w-full rounded-md px-4 py-2 bg-neutral-800 text-white placeholder:text-neutral-400 outline-none border border-neutral-700 focus:border-red-500"
      />

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-md shadow-lg max-h-80 overflow-auto z-50">
          <ul>
            {results.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-800 cursor-pointer"
                onClick={async () => {
                  try {
                    if (t.preview) {
                      await audio.play({ url: t.preview, title: t.title, artist: t.artist?.name, cover: t.album?.cover_small })
                    }
                  } catch (err) {
                    // fallback to simple audio element if hook not available
                    if (t.preview) {
                      let audio = document.getElementById("__deezer_preview_audio") as HTMLAudioElement | null
                      if (!audio) {
                        audio = document.createElement("audio")
                        audio.id = "__deezer_preview_audio"
                        audio.preload = "auto"
                        document.body.appendChild(audio)
                      }
                      if (audio.src !== t.preview) audio.src = t.preview
                      audio.play().catch((e) => console.error("preview play fallback failed", e))
                    }
                  }
                }}
              >
                <img src={t.album?.cover_small} alt="cover" className="w-10 h-10 rounded-sm object-cover" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{t.title}</div>
                  <div className="text-xs text-neutral-400 truncate">{t.artist?.name}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && (
        <div className="absolute right-2 top-2 text-neutral-400 text-sm">Searching...</div>
      )}
    </div>
  )
}
