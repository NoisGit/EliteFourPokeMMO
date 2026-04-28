import type { Language } from '../i18n/translations'

const moveTranslations: Array<[RegExp, string]> = [
  [/\bTRUCO\b/gi, 'Trick'],
  [/\bTruco\b/g, 'Trick'],
  [/\bTRAMPA ROCAS\b/gi, 'Stealth Rock'],
  [/\bTrampa Rocas\b/gi, 'Stealth Rock'],
  [/\bOTRA VEZ\b/gi, 'Encore'],
  [/\bOtra vez\b/gi, 'Encore'],
  [/\bMaquinaci[oó]n\b/gi, 'Nasty Plot'],
  [/\bTambor\b/gi, 'Belly Drum'],
  [/\bDanza Aleteo\b/gi, 'Quiver Dance'],
  [/\bVelocidad X\b/gi, 'X Speed'],
  [/\bPrecisi[oó]n X\b/gi, 'X Accuracy'],
  [/\bEspecial X\b/gi, 'X Sp. Atk'],
  [/\bSurf\b/gi, 'Surf'],
  [/\bCar[aá]mbano\b/gi, 'Icicle Spear'],
  [/\bRoca Afilada\b/gi, 'Stone Edge'],
  [/\bTriturar\b/gi, 'Crunch'],
  [/\bTerremoto\b/gi, 'Earthquake'],
  [/\bCabezazo Zen\b/gi, 'Zen Headbutt'],
  [/\bGiro Bola\b/gi, 'Gyro Ball'],
  [/\bAutodestrucci[oó]n\b/gi, 'Self-Destruct'],
  [/\bHuesomerang\b/gi, 'Bonemerang'],
  [/\bEscaldar\b/gi, 'Scald'],
  [/\bRayo\b/gi, 'Thunderbolt'],
  [/\bPoder Oculto\b/gi, 'Hidden Power'],
  [/\bBostezo\b/gi, 'Yawn'],
  [/\bAmortiguador\b/gi, 'Soft-Boiled'],
  [/\bTeletransporte\b/gi, 'Teleport'],
  [/\bPuño Drenaje\b/gi, 'Drain Punch'],
  [/\bBola Sombra\b/gi, 'Shadow Ball'],
  [/\bEncanto\b/gi, 'Charm'],
]

const itemTranslations: Array<[RegExp, string]> = [
  [/\bLlamasfera\b/gi, 'Flame Orb'],
]

const phraseTranslations: Array<[RegExp, string]> = [
  [/\bNO CAMBIA\b/g, 'DOES NOT SWITCH'],
  [/\bNo cambia\b/g, 'Does not switch'],
  [/\bSi utiliza\b/gi, 'If it uses'],
  [/\bSi usa\b/gi, 'If it uses'],
  [/\bSi cambia a\b/gi, 'If it switches to'],
  [/\bSi entra\b/gi, 'If it comes in'],
  [/\bSi tiene\b/gi, 'If it has'],
  [/\bSi no tiene\b/gi, 'If it does not have'],
  [/\bcambia a\b/gi, 'switch to'],
  [/\bCambia a\b/g, 'Switch to'],
  [/\bsaca a\b/gi, 'send out'],
  [/\bSacrifica a\b/g, 'Sacrifice'],
  [/\bsacrifica a\b/gi, 'sacrifice'],
  [/\bsacrificar a\b/gi, 'sacrifice'],
  [/\bsacrifica\b/gi, 'sacrifice'],
  [/\bdeja que caiga\b/gi, 'let it faint'],
  [/\busa\b/gi, 'use'],
  [/\bUsa\b/g, 'Use'],
  [/\butiliza\b/gi, 'use'],
  [/\bpara quedar en\b/gi, 'to reach'],
  [/\bAtaque Especial\b/gi, 'Special Attack'],
  [/\bAtaque\b/gi, 'Attack'],
  [/\bVelocidad\b/gi, 'Speed'],
  [/\bPS al máximo\b/gi, 'full HP'],
  [/\bPS\b/g, 'HP'],
  [/\bbarrer\b/gi, 'sweep'],
  [/\bbarre\b/gi, 'sweep'],
  [/\bpara luego volver con\b/gi, 'then go back to'],
  [/\bsi a[uú]n sigue en el campo y no cambia\b/gi, 'if it is still on the field and does not switch'],
  [/\bsi sorpresivamente utiliza\b/gi, 'if it unexpectedly uses'],
  [/\bsi .* esta bloqueado usa\b/gi, 'if the locked move is unavailable, use'],
  [/\bencerrar en\b/gi, 'lock into'],
  [/\bcontra\b/gi, 'against'],
  [/\bfrente a\b/gi, 'against'],
]

const regionTranslations: Array<[RegExp, string]> = [
  [/\bTeselia\b/g, 'Unova'],
]

export const translateStrategyText = (text: string, language: Language) => {
  if (language === 'es') return text

  return [...moveTranslations, ...itemTranslations, ...phraseTranslations, ...regionTranslations]
    .reduce((currentText, [pattern, replacement]) => currentText.replace(pattern, replacement), text)
}

export const formatStrategyText = (text: string) => {
  return text
    .replace(/\s+/g, ' ')
    .trim()
}
