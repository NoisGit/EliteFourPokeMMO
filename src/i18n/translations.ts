export type Language = 'es' | 'en'

export interface TranslationLabels {
  title: string
  subtitle: string
  routeLabel: string
  route: string
  teamLabel: string
  teamTitle: string
  teamDescription: string
  teamButton: string
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
    teamLabel: 'Equipo recomendado',
    teamTitle: 'PokePaste del team',
    teamDescription: 'Consulta naturaleza, movimientos, objetos y spreads del equipo usado por la guía.',
    teamButton: 'Ver equipo',
    languageLabel: 'Idioma',
    tipsTitle: 'Recomendaciones antes de empezar',
    tipsBadge: 'Equipo + tips',
    tips: [
      'Completa cada Liga regional al menos 5 veces antes de usar la guía para que el equipo llegue al nivel 100.',
      'Las estrategias asumen que el equipo recomendado tiene objetos, EV/IV y PS al 100 % antes de cada combate.',
      'Evita cambiar Pokémon, objetos o movimientos si la guía no lo indica, porque puede alterar el orden de la estrategia.',
      'Los boosts dependen del Pokémon y del movimiento usado; no todos los +2/+4/+6 suben la misma estadística.',
      'Cuando una línea diga sacrificar, significa dejar que ese Pokémon caiga debilitado para entrar seguro con el siguiente.',
    ],
    boostLegendTitle: 'Leyenda rápida de boosts',
    boostLegend: [
      'Gengar +2: normalmente Maquinación, sube Ataque Especial.',
      'Poliwrath +6: normalmente Tambor, maximiza Ataque a cambio de PS.',
      'Volcarona +1/+2/+3: Danza Aleteo acumulada; sube Ataque Especial, Defensa Especial y Velocidad.',
      'Velocidad X y Precisión X suben Velocidad o Precisión según se indique en la estrategia.',
      'No interpretes +6 como una estadística fija: siempre depende del contexto del turno.',
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
    teamLabel: 'Recommended team',
    teamTitle: 'Team PokePaste',
    teamDescription: 'Check the nature, moves, items, and spreads used by this guide.',
    teamButton: 'View team',
    languageLabel: 'Language',
    tipsTitle: 'Before you start',
    tipsBadge: 'Team + tips',
    tips: [
      'Clear each regional League at least 5 times before using this guide so your team reaches level 100.',
      'The strategies assume the recommended team has the correct items, EV/IV setup, and full HP before each battle.',
      'Do not swap Pokémon, items, or moves unless the guide says so, because it can change the strategy order.',
      'Boosts depend on the Pokémon and the move used; not every +2/+4/+6 raises the same stat.',
      'When a line says sacrifice, it means letting that Pokémon faint so the next Pokémon can enter safely.',
    ],
    boostLegendTitle: 'Quick boost legend',
    boostLegend: [
      'Gengar +2: usually Nasty Plot, raising Special Attack.',
      'Poliwrath +6: usually Belly Drum, maximizing Attack at the cost of HP.',
      'Volcarona +1/+2/+3: stacked Quiver Dance; raises Special Attack, Special Defense, and Speed.',
      'X Speed and X Accuracy raise Speed or Accuracy when the strategy says so.',
      'Do not read +6 as one fixed stat: it always depends on the turn context.',
    ],
    selectRegion: 'Choose a region',
    selectLeader: 'Choose an Elite Four member or Champion',
    selectPokemon: 'Choose the opposing Pokémon to see the answer.',
    noStrategies: 'No strategies available yet for',
    initialMoveLabel: 'Recommended opener',
  },
}
