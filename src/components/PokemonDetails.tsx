import type { Pokemon } from '../interfaces/Pokemon'
import type { Language, translations } from '../i18n/translations'
import { formatStrategyText, translateStrategyText } from '../utils/strategyText'
import { TrickItem } from './TrickItem'

interface PokemonDetailsProps {
  pokemon: Pokemon
  language: Language
  labels: typeof translations[Language]
}

export const PokemonDetails = ({ pokemon, language, labels }: PokemonDetailsProps) => {
  const initialMove = formatStrategyText(translateStrategyText(pokemon.initialMove, language))

  return (
    <section className="animate-in slide-in-from-bottom duration-300 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.22em] text-rose-200">{labels.initialMoveLabel}</span>
          <h3 className="mt-2 text-2xl font-black text-white">{initialMove}</h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
          <span className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Matchup</span>
          <span className="text-lg font-black text-white">{pokemon.name}</span>
        </div>
      </div>

      <div className="space-y-3">
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
