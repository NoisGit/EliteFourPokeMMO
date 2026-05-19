import { ChevronRight, ChevronDown } from "lucide-react"
import { useEffect, useState, type KeyboardEvent } from "react"
import type { Language, TranslationLabels } from "../i18n/translations"
import type { Tricks } from "../interfaces/Pokemon"
import { localizeStrategyText } from "../utils/strategyLocalization"

interface TrickItemProps {
  trick: Tricks
  language: Language
  labels: TranslationLabels
  level?: number
}

const getToneClasses = (text: string, hasVariants: boolean) => {
  const normalizedText = text.toLowerCase()

  if (normalizedText.includes('🚨') || normalizedText.includes('warning') || normalizedText.includes('careful') || normalizedText.includes('cuidado')) {
    return {
      card: 'border-red-300/30 bg-red-400/10 hover:border-red-200/50 hover:bg-red-400/15',
      badge: 'text-red-100',
      dot: 'bg-red-200',
    }
  }

  if (normalizedText.includes('✅') || normalizedText.includes('safe') || normalizedText.includes('stable') || normalizedText.includes('segura') || normalizedText.includes('estable')) {
    return {
      card: 'border-emerald-300/30 bg-emerald-400/10 hover:border-emerald-200/50 hover:bg-emerald-400/15',
      badge: 'text-emerald-100',
      dot: 'bg-emerald-200',
    }
  }

  if (normalizedText.includes('💰') || normalizedText.includes('save money') || normalizedText.includes('ahorro')) {
    return {
      card: 'border-amber-300/30 bg-amber-400/10 hover:border-amber-200/50 hover:bg-amber-400/15',
      badge: 'text-amber-100',
      dot: 'bg-amber-200',
    }
  }

  if (normalizedText.includes('🍀') || normalizedText.includes('luck') || normalizedText.includes('suerte')) {
    return {
      card: 'border-lime-300/30 bg-lime-400/10 hover:border-lime-200/50 hover:bg-lime-400/15',
      badge: 'text-lime-100',
      dot: 'bg-lime-200',
    }
  }

  if (normalizedText.includes('💊') || normalizedText.includes('x speed') || normalizedText.includes('x accuracy') || normalizedText.includes('x sp. atk') || normalizedText.includes('ataque x') || normalizedText.includes('velocidad x') || normalizedText.includes('precisión x')) {
    return {
      card: 'border-violet-300/30 bg-violet-400/10 hover:border-violet-200/50 hover:bg-violet-400/15',
      badge: 'text-violet-100',
      dot: 'bg-violet-200',
    }
  }

  if (hasVariants) {
    return {
      card: 'border-rose-300/30 bg-rose-400/10 hover:border-rose-200/50 hover:bg-rose-400/15',
      badge: 'text-rose-100',
      dot: 'bg-rose-200',
    }
  }

  return {
    card: 'border-white/10 bg-white/5 hover:border-cyan-200/35 hover:bg-cyan-300/10',
    badge: 'text-slate-400',
    dot: 'bg-cyan-200',
  }
}

export function TrickItem({ trick, language, labels, level = 0 }: TrickItemProps) {
  const variants = trick.variant || []
  const hasVariants = variants.length > 0
  const [isExpanded, setIsExpanded] = useState(false)
  const strategyText = localizeStrategyText(trick.detail, language)
  const tone = getToneClasses(strategyText, hasVariants)
  const indentation = level > 0 ? `clamp(${level * 0.15}rem, ${level * 1.1}vw, ${level * 0.6}rem)` : undefined

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
      <div
        className={`group mb-2 rounded-2xl border p-3 transition-colors duration-300 will-change-transform sm:p-3.5 ${hasVariants ? 'cursor-pointer' : ''} ${tone.card}`}
        style={{ marginLeft: indentation }}
        onClick={hasVariants ? toggleExpand : undefined}
        onKeyDown={handleKeyDown}
        role={hasVariants ? 'button' : undefined}
        tabIndex={hasVariants ? 0 : undefined}
        aria-expanded={hasVariants ? isExpanded : undefined}
      >
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex flex-none items-start pt-1.5">
            <span className={`inline-flex h-2.5 w-2.5 rounded-full shadow-lg shadow-black/20 ${tone.dot}`} />
          </div>

          <div className="min-w-0 flex-1">
            {hasVariants && (
              <span className={`mb-1 block text-[0.58rem] font-black uppercase tracking-[0.16em] sm:text-[0.65rem] ${tone.badge}`}>
                {labels.variantLabel}
              </span>
            )}

            <div className="flex min-w-0 items-start gap-2">
              {hasVariants ? (
                isExpanded ? (
                  <ChevronDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-100 transition-transform duration-300 sm:h-5 sm:w-5" />
                ) : (
                  <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-100 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
                )
              ) : null}
              <span className="min-w-0 overflow-hidden break-words text-[0.9rem] font-semibold leading-5 text-slate-50 [overflow-wrap:anywhere] sm:text-sm sm:leading-6">
                {strategyText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {hasVariants && isExpanded && (
        <div className="min-w-0 overflow-hidden pl-2 animate-in slide-in-from-top duration-300 sm:pl-3">
          {variants.map((variant, index) => (
            <TrickItem
              key={`${variant.detail}-${index}`}
              trick={variant}
              language={language}
              labels={labels}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
