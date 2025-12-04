"use client"

import { useState } from "react"

export function SpotifyPlayer() {
  const [volume, setVolume] = useState(60)
  const [progress, setProgress] = useState(45)

  return (
    <div className="mt-16 mb-8">
      <div className="bg-linear-to-r from-neutral-900 via-neutral-800 to-neutral-900 border border-red-500/20 rounded-2xl p-8">
        <div className="space-y-6">
          {/* Player Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-linear-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-2xl">
              ♫
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-lg">Now Playing</h4>
              <p className="text-neutral-400 text-sm">Beautiful Symphony</p>
            </div>
            <div className="text-right">
              <div className="text-neutral-400 text-sm">2:34 / 4:18</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-1 bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-red-500 to-red-400 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-neutral-500">
              <span>2:34</span>
              <span>4:18</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button className="text-neutral-400 hover:text-white transition-colors text-xl">⏮</button>
            <button className="w-12 h-12 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full flex items-center justify-center text-white text-xl transition-all transform hover:scale-110">
              ▶
            </button>
            <button className="text-neutral-400 hover:text-white transition-colors text-xl">⏭</button>
          </div>

          {/* Volume & Features */}
          <div className="flex items-center gap-4 pt-4 border-t border-neutral-700">
            <span className="text-neutral-400 text-sm">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-1 bg-neutral-700 rounded-full appearance-none cursor-pointer accent-red-500"
            />
            <span className="text-neutral-400 text-sm w-8">{volume}</span>

            <div className="flex gap-2 ml-4">
              <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors">🎵</button>
              <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors">💬</button>
              <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors">📱</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
