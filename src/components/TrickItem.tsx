import { ChevronRight, ChevronDown } from "lucide-react"
import { useEffect, useState, type KeyboardEvent } from "react"
import type { Language } from "../i18n/translations"
import type { Tricks } from "../interfaces/Pokemon"
import { translateFullStrategyText } from "../utils/fullStrategyTranslations"
import { formatStrategyText, translateStrategyText } from "../utils/strategyText"

interface TrickItemProps {
  trick: Tricks
  language: Language
  level?: number
}

const getToneClasses = (text: string, hasVariants: boolean) => {
  const normalizedText = text.toLowerCase()

  if (normalizedText.includes('🚨') || normalizedText.includes('alerta') || normalizedText.includes('cuidado')) {
    return {
      card: 'border-red-300/35 bg-red-400/15 hover:border-red-200/60 hover:bg-red-400/20',
      badge: 'border-red-200/50 bg-red-200 text-red-950',
      dot: 'bg-red-200',
      line: 'border-red-200/35',
    }
  }

  if (normalizedText.includes('✅') || normalizedText.includes('segura') || normalizedText.includes('estable')) {
    return {
      card: 'border-emerald-300/35 bg-emerald-400/15 hover:border-emerald-200/60 hover:bg-emerald-400/20',
      badge: 'border-emerald-200/50 bg-emerald-200 text-emerald-950',
      dot: 'bg-emerald-200',
      line: 'border-emerald-200/35',
    }
  }

  if (normalizedText.includes('💰') || normalizedText.includes('ahorro')) {
    return {
      card: 'border-amber-300/35 bg-amber-400/15 hover:border-amber-200/60 hover:bg-amber-400/20',
      badge: 'border-amber-200/50 bg-amber-200 text-amber-950',
      dot: 'bg-amber-200',
      line: 'border-amber-200/35',
    }
  }

  if (normalizedText.includes('🍀') || normalizedText.includes('suerte')) {
    return {
      card: 'border-lime-300/35 bg-lime-400/15 hover:border-lime-200/60 hover:bg-lime-400/20',
      badge: 'border-lime-200/50 bg-lime-200 text-lime-950',
      dot: 'bg-lime-200',
      line: 'border-lime-200/35',
    }
  }

  if (normalizedText.includes('💊') || normalizedText.includes('ataque x') || normalizedText.includes('velocidad x') || normalizedText.includes('precisión x')) {
    return {
      card: 'border-violet-300/35 bg-violet-400/15 hover:border-violet-200/60 hover:bg-violet-400/20',
      badge: 'border-violet-200/50 bg-violet-200 text-violet-950',
      dot: 'bg-violet-200',
      line: 'border-violet-200/35',
    }
  }

  if (hasVariants) {
    return {
      card: 'border-rose-300/35 bg-rose-400/15 hover:border-rose-200/60 hover:bg-rose-400/20',
      badge: 'border-rose-200/50 bg-rose-200 text-rose-950',
      dot: 'bg-rose-200',
      line: 'border-rose-200/35',
    }
  }

  return {
    card: 'border-white/10 bg-white/5 hover:border-cyan-200/40 hover:bg-cyan-300/10',
    badge: 'border-cyan-200/50 bg-cyan-200 text-slate-950',
    dot: 'bg-cyan-200',
    line: 'border-cyan-200/25',
  }
}

export function TrickItem({ trick, language, level = 0 }: TrickItemProps) {
  const variants = trick.variant || []
  const hasVariants = variants.length > 0
  const [isExpanded, setIsExpanded] = useState(false)
  const strategyText = formatStrategyText(
    translateStrategyText(translateFullStrategyText(trick.detail, language), language),
  )
  const tone = getToneClasses(strategyText, hasVariants)
  const indentation = level > 0 ? `clamp(${level * 0.15}rem, ${level * 1.1}vw, ${level * 0.6}rem)` : undefined
  const variantLabel = hasVariants ? 'Variante' : 'Final'

  useEffect(() => {
    setIsExpanded(false)
  }, [trick.detail, language, level])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!hasVariants) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleExpand()
    }
  }

  return (
    <div className="relative w-full min-w-0 overflow-hidden">
      {level > 0 && (
        <span className={`absolute left-0 top-0 h-full border-l ${tone.line}`} />
      )}

      <div
        className={`group mb-2 rounded-2xl border p-2.5 transition-colors duration-300 will-change-transform sm:p-3.5 ${
          hasVariants ? 'cursor-pointer' : ''
        } ${tone.card}`}
        style={{ marginLeft: indentation }}
        onClick={hasVariants ? toggleExpand : undefined}
        onKeyDown={handleKeyDown}
        role={hasVariants ? 'button' : undefined}
        tabIndex={hasVariants ? 0 : undefined}
        aria-expanded={hasVariants ? isExpanded : undefined}
      >
        <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
          <div className="flex flex-none flex-col items-center gap-2 pt-0.5">
            <span className={`inline-flex h-3 w-3 rounded-full shadow-lg shadow-black/20 ${tone.dot}`} />
            <span className={`h-full min-h-8 border-l ${tone.line}`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-slate-950/40 px-2 py-0.5 text-[0.58rem] font-black uppercase tracking-[0.12em] text-slate-300 sm:text-[0.65rem]">
                {level === 0 ? 'Condición' : 'Paso dependiente'}
              </span>
              <span className={`rounded-full border px-2 py-0.5 text-[0.58rem] font-black uppercase tracking-[0.12em] sm:text-[0.65rem] ${hasVariants ? tone.badge : 'border-white/10 bg-slate-950/40 text-slate-400'}`}>
                {variantLabel}
              </span>
            </div>

            <div className="flex min-w-0 items-start gap-2">
              {hasVariants ? (
                isExpanded ? (
                  <ChevronDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-100 transition-transform duration-300 sm:h-5 sm:w-5" />
                ) : (
                  <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-100 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
                )
              ) : null}
              <span className="min-w-0 overflow-hidden break-words text-[0.86rem] font-semibold leading-5 text-slate-50 [overflow-wrap:anywhere] sm:text-sm sm:leading-6">
                {strategyText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {hasVariants && isExpanded && (
        <div className={`min-w-0 overflow-hidden border-l pl-2 animate-in slide-in-from-top duration-300 sm:pl-3 ${tone.line}`}>
          {variants.map((variant, index) => (
            <TrickItem
              key={`${variant.detail}-${index}`}
              trick={variant}
              language={language}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
