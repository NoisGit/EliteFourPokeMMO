import { useRef } from 'react'
import { gsap } from 'gsap'
import type { ConfigLeader } from '../interfaces/Region'
import { getLocalTrainerSpriteUrl } from '../utils/trainerSprites'

interface LeaderCardProps {
  leader: ConfigLeader
  isExpanded: boolean
  onClick: (leaderId: string) => void
}

const prefersReducedMotion = () => (
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

export const LeaderCard = ({ leader, isExpanded, onClick }: LeaderCardProps) => {
  const cardRef = useRef<HTMLButtonElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const leaderImage = getLocalTrainerSpriteUrl(leader.name)

  const animateCard = (isHovering: boolean) => {
    if (prefersReducedMotion()) return

    gsap.to(cardRef.current, {
      y: isHovering ? -5 : 0,
      scale: isHovering ? 1.014 : 1,
      duration: 0.22,
      ease: 'power2.out',
      force3D: true,
      overwrite: 'auto',
    })

    gsap.to(imageRef.current, {
      y: isHovering ? -3 : 0,
      scale: isHovering ? 1.025 : 1,
      duration: 0.26,
      ease: 'power2.out',
      force3D: true,
      overwrite: 'auto',
    })
  }

  return (
    <button
      ref={cardRef}
      type="button"
      className={`gsap-leader-card group relative min-w-0 overflow-hidden rounded-2xl border bg-slate-950/75 p-2.5 text-left shadow-lg shadow-black/20 transition-colors duration-300 will-change-transform hover:border-rose-200/50 hover:bg-slate-900/95 active:scale-[0.98] sm:rounded-3xl sm:p-3 ${
        isExpanded
          ? 'border-rose-200/80 ring-2 ring-rose-300/70'
          : 'border-white/10'
      }`}
      onClick={() => onClick(leader.id)}
      onMouseEnter={() => animateCard(true)}
      onMouseLeave={() => animateCard(false)}
      onFocus={() => animateCard(true)}
      onBlur={() => animateCard(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-400/25 via-transparent to-cyan-300/15 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-32 items-center justify-center rounded-xl bg-black/20 p-2.5 min-[420px]:h-36 sm:h-36 sm:p-3 lg:h-40">
        <img
          ref={imageRef}
          src={leaderImage}
          alt={leader.name}
          className="h-full w-full object-contain drop-shadow-2xl will-change-transform"
          loading="lazy"
        />
      </div>
      <span className="relative mt-2 block truncate rounded-xl bg-black/55 px-2 py-2 text-center text-sm font-black leading-tight text-white sm:text-sm lg:text-base">
        {leader.name}
      </span>
    </button>
  )
}
