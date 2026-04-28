import type { Language } from '../i18n/translations'

const moveTranslations: Array<[RegExp, string]> = [
  [/\bTRUCO\b/gi, 'Trick'],
  [/\bTruco\b/g, 'Trick'],
  [/\bOTRA VEZ\b/gi, 'Encore'],
  [/\bOtra vez\b/gi, 'Encore'],
  [/\bMaquinaci[oó]n\b/gi, 'Nasty Plot'],
  [/\bVelocidad X\b/gi, 'X Speed'],
  [/\bPrecisi[oó]n X\b/gi, 'X Accuracy'],
  [/\bSurf\b/gi, 'Surf'],
  [/\bCar[aá]mbano\b/gi, 'Icicle Spear'],
  [/\bRoca Afilada\b/gi, 'Stone Edge'],
  [/\bTriturar\b/gi, 'Crunch'],
  [/\bTerremoto\b/gi, 'Earthquake'],
  [/\bHuesomerang\b/gi, 'Bonemerang'],
  [/\bEscaldar\b/gi, 'Scald'],
  [/\bRayo\b/gi, 'Thunderbolt'],
  [/\bPoder Oculto\b/gi, 'Hidden Power'],
]

const phraseTranslations: Array<[RegExp, string]> = [
  [/\bNO CAMBIA\b/g, 'DOES NOT SWITCH'],
  [/\bNo cambia\b/g, 'Does not switch'],
  [/\bSi utiliza\b/gi, 'If it uses'],
  [/\bSi cambia a\b/gi, 'If it switches to'],
  [/\bcambia a\b/gi, 'switch to'],
  [/\bsaca a\b/gi, 'send out'],
  [/\butiliza\b/gi, 'use'],
  [/\busa\b/gi, 'use'],
  [/\bpara luego volver con\b/gi, 'then go back to'],
  [/\bsi a[uú]n sigue en el campo y no cambia\b/gi, 'if it is still on the field and does not switch'],
  [/\bsi sorpresivamente utiliza\b/gi, 'if it unexpectedly uses'],
  [/\bsi .* esta bloqueado usa\b/gi, 'if the locked move is unavailable, use'],
  [/\bencerrar en\b/gi, 'lock into'],
  [/\bcontra\b/gi, 'against'],
]

const regionTranslations: Array<[RegExp, string]> = [
  [/\bTeselia\b/g, 'Unova'],
]

const boostDescriptions: Array<[RegExp, string]> = [
  [/(\b|\s)6\+2(\b|\s|\.|\))/g, ' +6 Sp. Atk + X Speed'],
  [/(\b|\s)\+6(\b|\s|\.|\))/g, ' +6 Sp. Atk'],
  [/(\b|\s)\+4(\b|\s|\.|\))/g, ' +4 Sp. Atk'],
  [/(\b|\s)\+2(\b|\s|\.|\))/g, ' +2'],
]

export const translateStrategyText = (text: string, language: Language) => {
  if (language === 'es') return text

  return [...moveTranslations, ...phraseTranslations, ...regionTranslations, ...boostDescriptions]
    .reduce((currentText, [pattern, replacement]) => currentText.replace(pattern, replacement), text)
}

export const formatStrategyText = (text: string) => {
  return text
    .replace(/\+2/g, '+2')
    .replace(/\+4/g, '+4')
    .replace(/\+6/g, '+6')
    .replace(/\s+/g, ' ')
    .trim()
}
