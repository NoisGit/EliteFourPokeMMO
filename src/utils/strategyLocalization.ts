import type { Language } from '../i18n/translations'
import { formatStrategyText } from './strategyFormat'

export const localizeStrategyText = (text: string, _language: Language) => formatStrategyText(text)
