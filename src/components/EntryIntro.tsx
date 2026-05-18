import { useEffect, useState } from 'react'

export const EntryIntro = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(false), 1800)

    return () => window.clearTimeout(timeout)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <div className="relative h-24 w-24 animate-pulse rounded-full border-4 border-slate-950 bg-gradient-to-b from-red-500 from-45% via-slate-950 via-45% to-white to-55% shadow-2xl shadow-cyan-300/20 sm:h-32 sm:w-32">
        <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-slate-950 bg-white" />
      </div>
    </div>
  )
}
