import { ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"
import type { Language } from "../i18n/translations"
import type { Tricks } from "../interfaces/Pokemon"
import { formatStrategyText, translateStrategyText } from "../utils/strategyText"

interface TrickItemProps {
  trick: Tricks
  language: Language
  level?: number
}

export function TrickItem({ trick, language, level = 0 }: TrickItemProps) {
  const variants = trick.variant || []
  const hasVariants = variants.length > 0
  const [isExpanded, setIsExpanded] = useState(level === 0)
  const strategyText = formatStrategyText(translateStrategyText(trick.detail, language))

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="w-full">
      <div
        className={`group mb-2 rounded-2xl border p-3 transition-all duration-300 ${
          hasVariants
            ? 'cursor-pointer border-rose-300/20 bg-rose-400/10 hover:border-rose-200/40 hover:bg-rose-400/15'
            : 'border-white/10 bg-white/5'
        }`}
        style={{ marginLeft: `${level * 0.85}rem` }}
        onClick={hasVariants ? toggleExpand : undefined}
      >
        <div className="flex items-start gap-3">
          {hasVariants ? (
            isExpanded ? (
              <ChevronDown className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-200 transition-transform duration-300" />
            ) : (
              <ChevronRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-200 transition-transform duration-300 group-hover:translate-x-0.5" />
            )
          ) : (
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300" />
          )}
          <span className="text-sm leading-6 text-slate-100">{strategyText}</span>
        </div>
      </div>

      {hasVariants && isExpanded && (
        <div className="border-l border-rose-200/20 pl-3 animate-in slide-in-from-top duration-300">
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
