import { ChevronRight, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import type { Language } from "../i18n/translations"
import type { Tricks } from "../interfaces/Pokemon"
import { translateFullStrategyText } from "../utils/fullStrategyTranslations"
import { formatStrategyText, translateStrategyText } from "../utils/strategyText"

interface TrickItemProps {
  trick: Tricks
  language: Language
  level?: number
}

export function TrickItem({ trick, language, level = 0 }: TrickItemProps) {
  const variants = trick.variant || []
  const hasVariants = variants.length > 0
  const [isExpanded, setIsExpanded] = useState(false)
  const strategyText = formatStrategyText(
    translateStrategyText(translateFullStrategyText(trick.detail, language), language),
  )
  const indentation = level > 0 ? `clamp(${level * 0.35}rem, ${level * 1.5}vw, ${level * 0.85}rem)` : undefined

  useEffect(() => {
    setIsExpanded(false)
  }, [trick.detail, language])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasVariants) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleExpand()
    }
  }

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <div
        className={`group mb-2 rounded-2xl border p-2.5 transition-all duration-300 sm:p-3 ${
          hasVariants
            ? 'cursor-pointer border-rose-300/20 bg-rose-400/10 hover:border-rose-200/40 hover:bg-rose-400/15'
            : 'border-white/10 bg-white/5'
        }`}
        style={{ marginLeft: indentation }}
        onClick={hasVariants ? toggleExpand : undefined}
        onKeyDown={handleKeyDown}
        role={hasVariants ? 'button' : undefined}
        tabIndex={hasVariants ? 0 : undefined}
        aria-expanded={hasVariants ? isExpanded : undefined}
      >
        <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
          {hasVariants ? (
            isExpanded ? (
              <ChevronDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-200 transition-transform duration-300 sm:h-5 sm:w-5" />
            ) : (
              <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-200 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
            )
          ) : (
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300" />
          )}
          <span className="min-w-0 overflow-hidden break-words text-sm leading-6 text-slate-100 [overflow-wrap:anywhere]">
            {strategyText}
          </span>
        </div>
      </div>

      {hasVariants && isExpanded && (
        <div className="min-w-0 overflow-hidden border-l border-rose-200/20 pl-2 animate-in slide-in-from-top duration-300 sm:pl-3">
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
