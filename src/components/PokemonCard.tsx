import { useEffect, useState } from 'react'
import type { Pokemon } from '../interfaces/Pokemon'
import {
  getLocalPokemonSpriteUrl,
  getPokemonAnimatedSpriteUrl,
  getPokemonDbGen9SpriteUrl,
  getPokemonGen8SpriteUrl,
} from '../utils/pokemonSprites'

interface PokemonCardProps {
  pokemon: Pokemon
  isSelected: boolean
  onClick: (pokemon: Pokemon) => void
}

export const PokemonCard = ({ pokemon, isSelected, onClick }: PokemonCardProps) => {
  const getInitialSprite = () => getPokemonDbGen9SpriteUrl(pokemon.name)
  const [spriteSrc, setSpriteSrc] = useState(getInitialSprite)
  const [fallbackStep, setFallbackStep] = useState(0)

  useEffect(() => {
    setSpriteSrc(getInitialSprite())
    setFallbackStep(0)
  }, [pokemon.name])

  const handleSpriteError = () => {
    if (fallbackStep === 0) {
      setFallbackStep(1)
      setSpriteSrc(getPokemonGen8SpriteUrl(pokemon.name))
      return
    }

    if (fallbackStep === 1) {
      setFallbackStep(2)
      setSpriteSrc(getPokemonAnimatedSpriteUrl(pokemon.name))
      return
    }

    if (fallbackStep === 2) {
      setFallbackStep(3)
      setSpriteSrc(getLocalPokemonSpriteUrl(pokemon.name))
    }
  }

  return (
    <button
      type="button"
      className={`group relative min-w-0 cursor-pointer overflow-hidden rounded-2xl border bg-slate-950/60 p-2 text-left shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/40 hover:bg-slate-900/90 ${
        isSelected
          ? 'scale-[1.03] border-cyan-200/70 ring-2 ring-cyan-300/70'
          : 'border-white/10'
      }`}
      onClick={() => onClick(pokemon)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/10 via-transparent to-rose-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-24 items-center justify-center sm:h-28">
        <img
          src={spriteSrc}
          alt={pokemon.name}
          className="h-full w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={handleSpriteError}
        />
      </div>
      <span className="relative mt-2 block truncate rounded-xl bg-black/35 px-2 py-1 text-center text-xs font-black text-white sm:text-sm">
        {pokemon.name}
      </span>
    </button>
  )
}
