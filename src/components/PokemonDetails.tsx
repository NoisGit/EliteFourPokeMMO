import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import type { Pokemon, Tricks } from '../interfaces/Pokemon'
import type { Language, TranslationLabels } from '../i18n/translations'
import { cleanEnglishStrategyText } from '../utils/englishStrategyCleanup'
import { cleanHybridEnglishStrategyText } from '../utils/englishHybridCleanup'
import { translateFullStrategyText } from '../utils/fullStrategyTranslations'
import { formatStrategyText, translateStrategyText } from '../utils/strategyText'
import { TrickItem } from './TrickItem'

interface PokemonDetailsProps {
  pokemon: Pokemon
  language: Language
  labels: TranslationLabels
}

const getStrategyText = (text: string, language: Language) => formatStrategyText(
  cleanHybridEnglishStrategyText(
    cleanEnglishStrategyText(
      translateStrategyText(translateFullStrategyText(text, language), language),
      language,
    ),
    language,
  ),
)

const buildStrategyTreeText = (tricks: Tricks[], language: Language, level = 0): string[] => (
  tricks.flatMap((trick) => {
    const indentation = '  '.repeat(level)
    const currentLine = `${indentation}- ${getStrategyText(trick.detail, language)}`
    const variantLines = trick.variant?.length
      ? buildStrategyTreeText(trick.variant, language, level + 1)
      : []

    return [currentLine, ...variantLines]
  })
)

export const PokemonDetails = ({ pokemon, language, labels }: PokemonDetailsProps) => {
  const [hasCopied, setHasCopied] = useState(false)
  const initialMove = getStrategyText(pokemon.initialMove, language)

  const handleCopyStrategy = async () => {
    const strategyLines = buildStrategyTreeText(pokemon.tricks || [], language)
    const strategyText = [
      pokemon.name,
      '',
      `${labels.recommendedOpenerLabel}: ${initialMove}`,
      '',
      labels.decisionTreeLabel,
      ...strategyLines,
    ].join('\n')

    await navigator.clipboard.writeText(strategyText)
    setHasCopied(true)
    window.setTimeout(() => setHasCopied(false), 1600)
  }

  return (
    <section className="animate-in slide-in-from-bottom duration-300 overflow-hidden rounded-[1.5rem] border border-cyan-200/20 bg-slate-950/75 shadow-2xl shadow-black/40 backdrop-blur-xl sm:rounded-[2rem]">
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-cyan-300/15 via-slate-950/20 to-rose-400/15 p-3 sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-52 w-52 rounded-full bg-rose-400/20 blur-3xl" />

        <button
          type="button"
          onClick={handleCopyStrategy}
          aria-label={hasCopied ? labels.copiedStrategyLabel : labels.copyStrategyLabel}
          title={hasCopied ? labels.copiedStrategyLabel : labels.copyStrategyLabel}
          className={`absolute right-4 top-4 z-20 inline-flex items-center justify-center p-1.5 transition-all duration-300 hover:scale-110 active:scale-95 sm:right-6 sm:top-6 ${
            hasCopied
              ? 'text-emerald-200'
              : 'text-slate-300 hover:text-cyan-100'
          }`}
        >
          {hasCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </button>

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between">
          <div className="min-w-0 flex-1 rounded-2xl border border-cyan-200/25 bg-slate-950/55 p-3 pr-12 shadow-xl shadow-black/20 sm:p-4 sm:pr-14">
            <div className="mb-3 flex min-w-0 flex-col gap-1">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
                {pokemon.name}
              </p>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-100 sm:text-base">
                {labels.recommendedOpenerLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-200/25 bg-cyan-200/10 p-3 sm:p-4">
              <h3 className="min-w-0 break-words text-xl font-black leading-tight text-white [overflow-wrap:anywhere] sm:text-2xl lg:text-3xl">
                {initialMove}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.22em]">
            {labels.decisionTreeLabel}
          </p>
        </div>

        <div className="min-w-0 space-y-3 overflow-hidden">
          {pokemon.tricks && pokemon.tricks.length > 0 ? (
            pokemon.tricks.map((trick, index) => (
              <TrickItem
                key={`${pokemon.id}-${index}`}
                trick={trick}
                language={language}
                labels={labels}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 py-8 text-center text-slate-400">
              {labels.noStrategies} {pokemon.name}.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
