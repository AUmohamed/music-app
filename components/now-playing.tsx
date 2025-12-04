"use client"

import { useState } from "react"

export function NowPlaying() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div
      className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-linear-to-br from-red-600/80 via-neutral-800 to-neutral-900">
        <div className="absolute inset-0 opacity-30 mix-blend-multiply">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-700 rounded-full blur-3xl opacity-20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <div className="mb-8">
          <div
            className={`w-40 h-40 bg-neutral-700 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 ${isPlaying ? "scale-105" : "scale-100"}`}
          >
            <div className="w-32 h-32 bg-linear-to-br from-neutral-600 to-neutral-800 rounded-xl flex items-center justify-center">
              <span className="text-6xl text-red-400">♫</span>
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Echoing Dreams</h2>
        <p className="text-neutral-300 text-lg mb-8">Artist Name</p>

        {/* Play Button */}
        <button
          className={`w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform ${isPlaying ? "scale-110" : "scale-100"}`}
        >
          <span className="text-white text-2xl">{isPlaying ? "⏸" : "▶"}</span>
        </button>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-linear-to-br from-white via-transparent to-transparent transition-opacity duration-500 pointer-events-none"></div>
    </div>
  )
}
