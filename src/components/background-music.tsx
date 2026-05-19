'use client'

import { useEffect, useRef } from 'react'

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef<boolean>(false)

  useEffect(() => {
    // Volume level: 15% (0.15) for a very pleasant, non-intrusive background atmosphere
    const TARGET_VOLUME = 0.15

    const audio = new Audio('/audio/background.webm')
    audio.loop = true
    audio.volume = TARGET_VOLUME
    audioRef.current = audio

    const startPlayback = () => {
      if (isPlayingRef.current || !audioRef.current) return

      audioRef.current
        .play()
        .then(() => {
          isPlayingRef.current = true
          // Remove all listeners once audio is successfully playing to save resources
          cleanupListeners()
        })
        .catch((err) => {
          console.warn('[BackgroundMusic] Autoplay failed or was blocked by browser:', err)
        })
    }

    const cleanupListeners = () => {
      window.removeEventListener('click', startPlayback)
      window.removeEventListener('touchstart', startPlayback)
      window.removeEventListener('keydown', startPlayback)
    }

    // Attach interaction listeners to trigger playback on the first user action
    window.addEventListener('click', startPlayback, { passive: true })
    window.addEventListener('touchstart', startPlayback, { passive: true })
    window.addEventListener('keydown', startPlayback, { passive: true })

    return () => {
      cleanupListeners()
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Completely hidden component — no UI is rendered, ensuring visitors cannot change the volume or pause
  return null
}
