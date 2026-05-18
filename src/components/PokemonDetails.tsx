import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import type { Pokemon, Tricks } from '../interfaces/Pokemon'
import type { Language, TranslationLabels } from '../i18n/translations'
import { cleanEnglishStrategyText } from '../utils/englishStrategyCleanup'
import { translateFullStrategyText } from '../utils/fullStrategyTranslations'
import { formatStrategyText, translateStrategyText } from '../utils/strategyText'
import { TrickItem } from './TrickItem'

interface PokemonDetailsProps {
  pokemon: Pokemon
  language: Language
  labels: TranslationLabels
}

const getStrategyText = (text: string, language: Language) => formatStrategyText(
  cleanEnglishStrategyText(
    translateStrategyText(translateFullStrategyText(text, language), language),
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

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between">
          <div className="min-w-0 flex-1 rounded-2xl border border-cyan-200/25 bg-slate-950/55 p-3 shadow-xl shadow-black/20 sm:p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-200/40 bg-cyan-200/15 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan-100 sm:text-xs">
                  {labels.initialMoveLabel}
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-slate-300 sm:text-xs">
                  {labels.openingTurnLabel}
                </span>
                <span className="rounded-full border border-rose-200/30 bg-rose-300/10 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-rose-100 sm:text-xs">
                  {pokemon.name}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyStrategy}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.14em] transition-all duration-300 active:scale-95 sm:text-xs ${
                  hasCopied
                    ? 'border-emerald-200/60 bg-emerald-200 text-emerald-950'
                    : 'border-white/10 bg-white/10 text-slate-200 hover:border-cyan-200/50 hover:bg-cyan-200/15 hover:text-cyan-100'
                }`}
              >
                {hasCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {hasCopied ? labels.copiedStrategyLabel : labels.copyStrategyLabel}
              </button>
            </div>

            <div className="rounded-2xl border border-cyan-200/35 bg-cyan-200/10 p-3 sm:p-4">
              <p className="mb-2 text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan-100 sm:text-xs">
                {labels.recommendedOpenerLabel}
              </p>
              <h3 className="min-w-0 break-words text-xl font-black leading-tight text-white [overflow-wrap:anywhere] sm:text-2xl lg:text-3xl">
                {initialMove}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-6">
        <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.22em]">
              {labels.decisionTreeLabel}
            </p>
            <h4 className="mt-1 text-base font-black text-white sm:text-lg">
              {labels.decisionTreeTitle}
            </h4>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-slate-300 sm:text-xs">
            {labels.expandVariantsLabel}
          </div>
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
