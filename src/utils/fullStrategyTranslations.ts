import type { Language } from '../i18n/translations'
import { kantoBrunoStrategyTranslations } from './kantoBrunoStrategyTranslations'
import { translateExactStrategyText } from './exactStrategyTranslations'

export const translateFullStrategyText = (text: string, language: Language) => {
  if (language === 'es') return text

  const exactTranslation = translateExactStrategyText(text, language)

  if (exactTranslation !== text) return exactTranslation

  return kantoBrunoStrategyTranslations[text] || text
}
