import { SpotifyPlayer } from "@/components/spotify-player"
import { TrackGrid } from "@/components/track-grid"
import { NowPlaying } from "@/components/now-playing"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-neutral-900 via-neutral-950 to-black overflow-hidden">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        <NowPlaying />
        <TrackGrid />
        <SpotifyPlayer />
      </div>
    </main>
  )
}
