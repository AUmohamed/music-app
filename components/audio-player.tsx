"use client"

import React, { createContext, useContext, useRef, useState } from "react"

type TrackMeta = { url: string; title?: string; artist?: string; cover?: string }

type AudioContextType = {
  play: (t: TrackMeta) => Promise<void>
  stop: () => void
  isPlaying: boolean
  current?: TrackMeta | null
}

const AudioCtx = createContext<AudioContextType | null>(null)

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error("useAudio must be used within AudioProvider")
  return ctx
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [current, setCurrent] = useState<TrackMeta | null>(null)

  const play = async (t: TrackMeta) => {
    if (!audioRef.current) {
      audioRef.current = document.createElement("audio")
      audioRef.current.preload = "auto"
      audioRef.current.crossOrigin = "anonymous"
      audioRef.current.addEventListener("ended", () => setIsPlaying(false))
    }

    if (current?.url !== t.url) {
      setCurrent(t)
      audioRef.current.src = t.url
    }

    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (err) {
      console.error("audio play failed", err)
      setIsPlaying(false)
    }
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }

  return (
    <AudioCtx.Provider value={{ play, stop, isPlaying, current }}>
      {children}
    </AudioCtx.Provider>
  )
}

export default AudioProvider
