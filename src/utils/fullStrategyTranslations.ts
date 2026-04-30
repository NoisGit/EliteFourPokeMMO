import type { Language } from '../i18n/translations'
import { kantoAgathaStrategyTranslations } from './kantoAgathaStrategyTranslations'
import { kantoBlueStrategyTranslations } from './kantoBlueStrategyTranslations'
import { kantoBrunoStrategyTranslations } from './kantoBrunoStrategyTranslations'
import { kantoLanceStrategyTranslations } from './kantoLanceStrategyTranslations'
import { translateExactStrategyText } from './exactStrategyTranslations'

export const translateFullStrategyText = (text: string, language: Language) => {
  if (language === 'es') return text

  const exactTranslation = translateExactStrategyText(text, language)

  if (exactTranslation !== text) return exactTranslation

  return kantoBlueStrategyTranslations[text] || kantoLanceStrategyTranslations[text] || kantoAgathaStrategyTranslations[text] || kantoBrunoStrategyTranslations[text] || text
}
