"use client"
import { TrackCard } from "./track-card"

const tracks = [
  {
    id: 1,
    title: "Midnight Echo",
    artist: "Luna Nova",
    plays: "1.2M",
    duration: "3:45",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 2,
    title: "Digital Waves",
    artist: "Synth Wave",
    plays: "892K",
    duration: "4:12",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 3,
    title: "Sunset Vibes",
    artist: "Tropical Sound",
    plays: "756K",
    duration: "3:58",
    color: "from-orange-600 to-red-600",
  },
  {
    id: 4,
    title: "Neon Dreams",
    artist: "Cyber Beats",
    plays: "945K",
    duration: "3:32",
    color: "from-green-600 to-emerald-600",
  },
  {
    id: 5,
    title: "Cosmic Journey",
    artist: "Space Sound",
    plays: "1.1M",
    duration: "4:25",
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: 6,
    title: "Urban Pulse",
    artist: "City Beats",
    plays: "678K",
    duration: "3:15",
    color: "from-red-600 to-pink-600",
  },
]

export function TrackGrid() {
  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-white mb-2">Trending Now</h3>
        <p className="text-neutral-400">Discover the hottest tracks this week</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  )
}
