import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import type { Pokemon } from '../interfaces/Pokemon'
import {
  getLocalPokemonSpriteUrl,
  getPokemonAnimatedSpriteUrl,
  getPokemonDbGen9SpriteUrl,
  getPokemonDbHomeSpriteUrl,
  getPokemonGen8SpriteUrl,
} from '../utils/pokemonSprites'

interface PokemonCardProps {
  pokemon: Pokemon
  isSelected: boolean
  onClick: (pokemon: Pokemon) => void
}

const prefersReducedMotion = () => (
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

export const PokemonCard = ({ pokemon, isSelected, onClick }: PokemonCardProps) => {
  const cardRef = useRef<HTMLButtonElement | null>(null)
  const spriteRef = useRef<HTMLImageElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)
  const getInitialSprite = () => getPokemonDbHomeSpriteUrl(pokemon.name)
  const [spriteSrc, setSpriteSrc] = useState(getInitialSprite)
  const [fallbackStep, setFallbackStep] = useState(0)

  useEffect(() => {
    setSpriteSrc(getInitialSprite())
    setFallbackStep(0)
  }, [pokemon.name])

  useEffect(() => {
    if (prefersReducedMotion()) return

    gsap.to(cardRef.current, {
      scale: isSelected ? 1.025 : 1,
      y: isSelected ? -3 : 0,
      duration: 0.22,
      ease: 'power2.out',
      force3D: true,
      overwrite: 'auto',
    })

    gsap.to(glowRef.current, {
      opacity: isSelected ? 0.85 : 0.28,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [isSelected])

  const animateCard = (isHovering: boolean) => {
    if (prefersReducedMotion()) return

    gsap.to(cardRef.current, {
      y: isHovering ? -5 : isSelected ? -3 : 0,
      scale: isHovering ? 1.03 : isSelected ? 1.025 : 1,
      duration: 0.2,
      ease: 'power2.out',
      force3D: true,
      overwrite: 'auto',
    })

    gsap.to(spriteRef.current, {
      y: isHovering ? -4 : 0,
      scale: isHovering ? 1.08 : 1,
      duration: 0.23,
      ease: 'power2.out',
      force3D: true,
      overwrite: 'auto',
    })

    gsap.to(glowRef.current, {
      opacity: isHovering || isSelected ? 0.9 : 0.28,
      duration: 0.18,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleSpriteError = () => {
    if (fallbackStep === 0) {
      setFallbackStep(1)
      setSpriteSrc(getPokemonDbGen9SpriteUrl(pokemon.name))
      return
    }

    if (fallbackStep === 1) {
      setFallbackStep(2)
      setSpriteSrc(getPokemonGen8SpriteUrl(pokemon.name))
      return
    }

    if (fallbackStep === 2) {
      setFallbackStep(3)
      setSpriteSrc(getPokemonAnimatedSpriteUrl(pokemon.name))
      return
    }

    if (fallbackStep === 3) {
      setFallbackStep(4)
      setSpriteSrc(getLocalPokemonSpriteUrl(pokemon.name))
    }
  }

  return (
    <button
      ref={cardRef}
      type="button"
      className={`gsap-pokemon-card group relative min-w-0 cursor-pointer overflow-hidden rounded-2xl border bg-slate-950/75 p-2 text-left shadow-lg shadow-black/20 transition-colors duration-300 will-change-transform hover:border-cyan-200/50 hover:bg-slate-900/95 active:scale-[0.97] sm:p-2 ${
        isSelected
          ? 'border-cyan-200/80 ring-2 ring-cyan-300/70'
          : 'border-white/10'
      }`}
      onClick={() => onClick(pokemon)}
      onMouseEnter={() => animateCard(true)}
      onMouseLeave={() => animateCard(false)}
      onFocus={() => animateCard(true)}
      onBlur={() => animateCard(false)}
    >
      <div ref={glowRef} className="absolute inset-0 bg-gradient-to-b from-cyan-300/25 via-transparent to-rose-400/20 opacity-30 transition-opacity duration-300" />
      <div className="relative flex h-24 items-center justify-center rounded-xl bg-black/20 min-[380px]:h-28 sm:h-24 lg:h-28">
        <img
          ref={spriteRef}
          src={spriteSrc}
          alt={pokemon.name}
          className="h-full w-full object-contain drop-shadow-lg will-change-transform"
          loading="lazy"
          onError={handleSpriteError}
        />
      </div>
      <span className="relative mt-2 block truncate rounded-xl bg-black/55 px-2 py-1.5 text-center text-xs font-black leading-tight text-white min-[380px]:text-sm sm:text-sm">
        {pokemon.name}
      </span>
    </button>
  )
}
