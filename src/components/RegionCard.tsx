import { useRef } from 'react'
import { gsap } from 'gsap'
import type { Region } from '../interfaces/Region'

const regionAccent: Record<string, string> = {
  kanto: 'from-red-400/35 to-amber-300/10',
  johto: 'from-yellow-300/35 to-orange-400/10',
  hoenn: 'from-emerald-300/35 to-cyan-400/10',
  sinnoh: 'from-indigo-300/35 to-sky-400/10',
  teselia: 'from-violet-300/35 to-rose-400/10',
}

const prefersReducedMotion = () => (
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

interface RegionCardProps {
  region: Region
  isExpanded: boolean
  onClick: (regionId: string) => void
}

export const RegionCard = ({ region, isExpanded, onClick }: RegionCardProps) => {
  const cardRef = useRef<HTMLButtonElement | null>(null)
  const shineRef = useRef<HTMLDivElement | null>(null)

  const animateCard = (isHovering: boolean) => {
    if (prefersReducedMotion()) return

    gsap.to(cardRef.current, {
      y: isHovering ? -5 : 0,
      scale: isHovering ? 1.018 : 1,
      duration: 0.22,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    gsap.to(shineRef.current, {
      xPercent: isHovering ? 115 : -115,
      opacity: isHovering ? 0.55 : 0,
      duration: isHovering ? 0.42 : 0.18,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  return (
    <button
      ref={cardRef}
      type="button"
      className={`gsap-region-card group relative min-w-0 overflow-hidden rounded-2xl border p-3.5 text-left shadow-lg shadow-black/20 transition-colors duration-300 will-change-transform hover:border-white/30 sm:rounded-3xl sm:p-4 ${
        isExpanded
          ? 'border-cyan-200/80 bg-slate-900/95 ring-2 ring-cyan-300/70'
          : 'border-white/10 bg-slate-950/65 hover:bg-slate-900/90'
      }`}
      onClick={() => onClick(region.id)}
      onMouseEnter={() => animateCard(true)}
      onMouseLeave={() => animateCard(false)}
      onFocus={() => animateCard(true)}
      onBlur={() => animateCard(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${regionAccent[region.id] || 'from-cyan-300/25 to-rose-400/10'} opacity-95`} />
      <div
        ref={shineRef}
        className="pointer-events-none absolute -inset-y-8 -left-1/3 w-1/3 -translate-x-full rotate-12 bg-white/30 opacity-0 blur-sm"
      />
      <div className="relative flex h-20 items-end sm:h-20 lg:h-24">
        <div className="min-w-0">
          <span className="mb-2 block h-1 w-9 rounded-full bg-cyan-200 transition-all duration-300 group-hover:w-14 sm:w-10 sm:group-hover:w-16" />
          <span className="block truncate text-lg font-black text-white min-[390px]:text-xl sm:text-xl lg:text-2xl">{region.name}</span>
        </div>
      </div>
    </button>
  )
}
