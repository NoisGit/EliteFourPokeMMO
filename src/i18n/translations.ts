export type Language = 'es' | 'en'

export interface TranslationLabels {
  title: string
  subtitle: string
  routeLabel: string
  route: string
  languageLabel: string
  tipsTitle: string
  tipsBadge: string
  tips: string[]
  boostLegendTitle: string
  boostLegend: string[]
  selectRegion: string
  selectLeader: string
  selectPokemon: string
  noStrategies: string
  initialMoveLabel: string
}

export const languages: Record<Language, string> = {
  es: 'ES',
  en: 'EN',
}

export const translations: Record<Language, TranslationLabels> = {
  es: {
    title: 'Farm Liga PokeMMO',
    subtitle: 'Guía visual para farmear la Liga con rutas, líderes y respuestas por Pokémon.',
    routeLabel: 'Ruta recomendada',
    route: 'Teselia → Hoenn → Sinnoh → Kanto → Johto',
    languageLabel: 'Idioma',
    tipsTitle: 'Recomendaciones antes de empezar',
    tipsBadge: 'Equipo + tips',
    tips: [
      'Completa cada Liga regional al menos 5 veces antes de usar la guía para que el equipo llegue al nivel 100.',
      'Las estrategias asumen que el equipo recomendado tiene objetos, EV/IV y PS al 100 % antes de cada combate.',
      'Evita cambiar Pokémon, objetos o movimientos si la guía no lo indica, porque puede alterar el orden de la estrategia.',
      'Cuando veas secuencias como +2, +2, +2, revisa la leyenda de boosts para entender qué se está subiendo.',
      'Al bloquear con Cloyster, usa Surf contra Gengar y Carámbano contra Lucario, Houndoom o Sharpedo cuando corresponda.',
    ],
    boostLegendTitle: 'Leyenda rápida de boosts',
    boostLegend: [
      '+2 con Maquinación: +2 niveles de Ataque Especial.',
      '+2 con Velocidad X: +2 niveles de Velocidad.',
      '+2 con Precisión X: +2 niveles de Precisión.',
      '+4 y +6 indican que el boost se acumuló dos o tres veces.',
    ],
    selectRegion: 'Elige una región',
    selectLeader: 'Elige un Alto Mando o Campeón',
    selectPokemon: 'Elige el Pokémon rival para ver la respuesta.',
    noStrategies: 'Aún no hay estrategias disponibles para',
    initialMoveLabel: 'Apertura recomendada',
  },
  en: {
    title: 'PokeMMO League Farm',
    subtitle: 'Visual guide for League farming with routes, trainers, and matchup-specific answers.',
    routeLabel: 'Recommended route',
    route: 'Unova → Hoenn → Sinnoh → Kanto → Johto',
    languageLabel: 'Language',
    tipsTitle: 'Before you start',
    tipsBadge: 'Team + tips',
    tips: [
      'Clear each regional League at least 5 times before using this guide so your team reaches level 100.',
      'The strategies assume the recommended team has the correct items, EV/IV setup, and full HP before each battle.',
      'Do not swap Pokémon, items, or moves unless the guide says so, because it can change the strategy order.',
      'When you see sequences like +2, +2, +2, check the boost legend to understand which stat is being raised.',
      'When locking with Cloyster, use Surf against Gengar and Icicle Spear against Lucario, Houndoom, or Sharpedo when needed.',
    ],
    boostLegendTitle: 'Quick boost legend',
    boostLegend: [
      '+2 with Nasty Plot: +2 Special Attack stages.',
      '+2 with X Speed: +2 Speed stages.',
      '+2 with X Accuracy: +2 Accuracy stages.',
      '+4 and +6 mean the boost was stacked two or three times.',
    ],
    selectRegion: 'Choose a region',
    selectLeader: 'Choose an Elite Four member or Champion',
    selectPokemon: 'Choose the opposing Pokémon to see the answer.',
    noStrategies: 'No strategies available yet for',
    initialMoveLabel: 'Recommended opener',
  },
}
