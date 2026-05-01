import type { Pokemon } from '../interfaces/Pokemon'
import type { Language, TranslationLabels } from '../i18n/translations'
import { translateFullStrategyText } from '../utils/fullStrategyTranslations'
import { formatStrategyText, translateStrategyText } from '../utils/strategyText'
import { TrickItem } from './TrickItem'

interface PokemonDetailsProps {
  pokemon: Pokemon
  language: Language
  labels: TranslationLabels
}

export const PokemonDetails = ({ pokemon, language, labels }: PokemonDetailsProps) => {
  const initialMove = formatStrategyText(
    translateStrategyText(translateFullStrategyText(pokemon.initialMove, language), language),
  )

  return (
    <section className="animate-in slide-in-from-bottom duration-300 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
      <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
        <div className="min-w-0">
          <span className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-rose-200 sm:text-xs sm:tracking-[0.22em]">
            {labels.initialMoveLabel}
          </span>
          <h3 className="mt-2 min-w-0 break-words text-xl font-black leading-tight text-white [overflow-wrap:anywhere] sm:text-2xl">
            {initialMove}
          </h3>
        </div>
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left sm:w-auto sm:px-4 sm:py-3 sm:text-right">
          <span className="block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-xs sm:tracking-[0.18em]">Matchup</span>
          <span className="block truncate text-base font-black text-white sm:text-lg">{pokemon.name}</span>
        </div>
      </div>

      <div className="min-w-0 space-y-3 overflow-hidden">
        {pokemon.tricks && pokemon.tricks.length > 0 ? (
          pokemon.tricks.map((trick, index) => (
            <TrickItem key={`${pokemon.id}-${index}`} trick={trick} language={language} />
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 py-8 text-center text-slate-400">
            {labels.noStrategies} {pokemon.name}.
          </div>
        )}
      </div>
    </section>
  )
}
