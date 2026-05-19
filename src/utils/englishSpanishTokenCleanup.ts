import type { Language } from '../i18n/translations'

const spanishPhraseCleanup: Array<[RegExp, string]> = [
  [/\bpendiente de confirmar\b/gi, 'pending confirmation'],
  [/\bse sugiere\b/gi, 'it is suggested to'],
  [/\bse recomienda\b/gi, 'it is recommended to'],
  [/\bes recomendable\b/gi, 'it is recommended to'],
  [/\bestrategia recomendada\b/gi, 'recommended strategy'],
  [/\bestrategia\b/gi, 'strategy'],
  [/\bpara curar al m[aá]ximo\b/gi, 'to heal to full HP'],
  [/\bpara curarse al m[aá]ximo\b/gi, 'to heal to full HP'],
  [/\bcurar al m[aá]ximo\b/gi, 'heal to full HP'],
  [/\bcurarse al m[aá]ximo\b/gi, 'heal to full HP'],
  [/\bpara curar a ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, 'to heal $1'],
  [/\bcurar a ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, 'heal $1'],
  [/\bhasta que quede en \+([0-9]+) Attack\b/gi, 'until it reaches +$1 Attack'],
  [/\bhasta que quede en \+([0-9]+) Special Attack\b/gi, 'until it reaches +$1 Special Attack'],
  [/\bhasta que quede en \+([0-9]+) Speed\b/gi, 'until it reaches +$1 Speed'],
  [/\bhasta que quede en \+([0-9]+)\b/gi, 'until it reaches +$1'],
  [/\bhasta que quede\b/gi, 'until it reaches'],
  [/\bhasta quedar en \+([0-9]+) Attack\b/gi, 'until it reaches +$1 Attack'],
  [/\bhasta quedar en \+([0-9]+) Special Attack\b/gi, 'until it reaches +$1 Special Attack'],
  [/\bhasta quedar en \+([0-9]+) Speed\b/gi, 'until it reaches +$1 Speed'],
  [/\bhasta quedar en \+([0-9]+)\b/gi, 'until it reaches +$1'],
  [/\bhasta quedar\b/gi, 'until it reaches'],
  [/\bhasta \+([0-9]+) Attack\b/gi, 'to reach +$1 Attack'],
  [/\bhasta \+([0-9]+) Special Attack\b/gi, 'to reach +$1 Special Attack'],
  [/\bhasta \+([0-9]+) Speed\b/gi, 'to reach +$1 Speed'],
  [/\bhasta \+([0-9]+)\b/gi, 'to reach +$1'],
  [/\bhasta que\b/gi, 'until'],
  [/\bhasta\b/gi, 'until'],
  [/\bla entrada segura de ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, '$1 can enter safely'],
  [/\bla entrada de ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, '$1 entry'],
  [/\bentrada segura de ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, '$1 can enter safely'],
  [/\bentrada de ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, '$1 entry'],
  [/\bdarle entrada segura a ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, '$1 can enter safely'],
  [/\bdar entrada segura a ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, '$1 can enter safely'],
  [/\bpara darle entrada segura a ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, 'so $1 can enter safely'],
  [/\bpara dar entrada segura a ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, 'so $1 can enter safely'],
  [/\bpara que ([A-Z][A-Za-z0-9♀♂'’.-]+) entre seguro\b/gi, 'so $1 can enter safely'],
  [/\bpara que ([A-Z][A-Za-z0-9♀♂'’.-]+) entre segura\b/gi, 'so $1 can enter safely'],
  [/\bpara que\b/gi, 'so'],
  [/\bpara usar\b/gi, 'to use'],
  [/\bpara use\b/gi, 'to use'],
  [/\bpara asegurar\b/gi, 'to secure'],
  [/\bpara\b/gi, 'to'],
]

const spanishTokenCleanup: Array<[RegExp, string]> = [
  [/\by\b/gi, 'and'],
  [/\bo\b/gi, 'or'],
  [/\bdel\b/gi, 'of the'],
  [/\bal\b/gi, 'to the'],
  [/\bla\b/gi, 'the'],
  [/\bel\b/gi, 'the'],
  [/\blas\b/gi, 'the'],
  [/\blos\b/gi, 'the'],
  [/\buna\b/gi, 'a'],
  [/\buno\b/gi, 'one'],
  [/\bcon\b/gi, 'with'],
  [/\bsin\b/gi, 'without'],
]

const finalCleanup: Array<[RegExp, string]> = [
  [/\bto the max\b/gi, 'to full HP'],
  [/\bto the m[aá]ximo\b/gi, 'to full HP'],
  [/\bheal to the full HP\b/gi, 'heal to full HP'],
  [/\bto heal to the full HP\b/gi, 'to heal to full HP'],
  [/\bthe entry of ([A-Z][A-Za-z0-9♀♂'’.-]+)\b/gi, '$1 entry'],
  [/\bof the ([A-Z][A-Za-z0-9♀♂'’.-]+) entry\b/gi, '$1 entry'],
  [/\bto the full HP\b/gi, 'to full HP'],
  [/\bto the \+([0-9]+)/g, 'to +$1'],
  [/\buntil the \+([0-9]+)/g, 'until +$1'],
  [/\bto to\b/gi, 'to'],
  [/\band and\b/gi, 'and'],
  [/\bor or\b/gi, 'or'],
  [/\s+([.,:;])/g, '$1'],
  [/\s{2,}/g, ' '],
]

export const cleanSpanishTokensFromEnglishStrategyText = (text: string, language: Language) => {
  if (language === 'es') return text

  return [
    ...spanishPhraseCleanup,
    ...spanishTokenCleanup,
    ...finalCleanup,
  ].reduce((currentText, [pattern, replacement]) => currentText.replace(pattern, replacement), text).trim()
}
