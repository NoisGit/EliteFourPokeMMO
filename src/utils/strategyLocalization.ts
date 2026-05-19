import type { Language } from '../i18n/translations'
import { cleanEnglishStrategyText } from './englishStrategyCleanup'
import { cleanHybridEnglishStrategyText } from './englishHybridCleanup'
import { cleanSpanishTokensFromEnglishStrategyText } from './englishSpanishTokenCleanup'
import { translateFullStrategyText } from './fullStrategyTranslations'
import { formatStrategyText, translateStrategyText } from './strategyText'

export const localizeStrategyText = (text: string, language: Language) => {
  const translatedText = translateFullStrategyText(text, language)
  const translatedMovesText = translateStrategyText(translatedText, language)
  const englishCleanText = cleanEnglishStrategyText(translatedMovesText, language)
  const hybridCleanText = cleanHybridEnglishStrategyText(englishCleanText, language)
  const localizedText = cleanSpanishTokensFromEnglishStrategyText(hybridCleanText, language)

  return formatStrategyText(localizedText)
}
