"use client"
import SearchBar from "./search-bar"

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-900/50 border-b border-red-500/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">♪</span>
          </div>
          <h1 className="text-2xl font-bold text-white">SoundWave</h1>
        </div>
        <div className="flex-1 mx-6">
          <SearchBar />
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-neutral-400 hover:text-white transition-colors">
            Discover
          </a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors">
            Playlists
          </a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors">
            Artists
          </a>
          <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors font-medium">
            Connect Spotify
          </button>
        </nav>
      </div>
    </header>
  )
}
