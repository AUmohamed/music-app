"use client"

import { useState } from "react"

interface Track {
  id: number
  title: string
  artist: string
  plays: string
  duration: string
  color: string
}

export function TrackCard({ track }: { track: Track }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div
      className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background */}
      <div className={`bg-linear-to-br ${track.color} p-0.5`}>
        <div className="bg-neutral-900 rounded-xl p-6 h-full">
          {/* Album Art Placeholder */}
          <div
            className={`w-full aspect-square rounded-lg mb-4 bg-linear-to-br ${track.color} flex items-center justify-center text-5xl transition-all duration-300 ${isHovered ? "scale-105 shadow-2xl" : ""}`}
          >
            ♪
          </div>

          {/* Track Info */}
          <h4 className="font-bold text-white text-lg mb-1 line-clamp-1">{track.title}</h4>
          <p className="text-neutral-400 text-sm mb-4 line-clamp-1">{track.artist}</p>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
            <span>{track.plays} plays</span>
            <span>{track.duration}</span>
          </div>

          {/* Action Buttons */}
          <div className={`flex gap-2 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${isLiked ? "bg-red-500 text-white" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"}`}
            >
              {isLiked ? "❤️ Liked" : "♡ Like"}
            </button>
            <button className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg font-medium transition-colors">
              ▶ Play
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
