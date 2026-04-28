const GEN_8_SPRITE_BASE_URL = 'https://play.pokemonshowdown.com/sprites/gen8'
const ANIMATED_SPRITE_BASE_URL = 'https://play.pokemonshowdown.com/sprites/ani'
const POKEMON_DB_GEN_9_SPRITE_BASE_URL = 'https://img.pokemondb.net/sprites/scarlet-violet/normal'

const specialSpriteSlugs: Record<string, string> = {
  'rotom hielo': 'rotom-frost',
  'rotom-hielo': 'rotom-frost',
  'rotom calor': 'rotom-heat',
  'rotom lavadora': 'rotom-wash',
  'rotom corte': 'rotom-mow',
  'rotom ventilador': 'rotom-fan',
  'nidoran macho': 'nidoran-m',
  'nidoran hembra': 'nidoran-f',
  'mime jr': 'mime-jr',
  'mr mime': 'mr-mime',
  'farfetchd': 'farfetchd',
}

export const getPokemonSpriteSlug = (name: string) => {
  const normalizedName = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return specialSpriteSlugs[normalizedName] || normalizedName.replace(/\s+/g, '-')
}

export const getPokemonGen8SpriteUrl = (name: string) => {
  return `${GEN_8_SPRITE_BASE_URL}/${getPokemonSpriteSlug(name)}.png`
}

export const getPokemonDbGen9SpriteUrl = (name: string) => {
  return `${POKEMON_DB_GEN_9_SPRITE_BASE_URL}/${getPokemonSpriteSlug(name)}.png`
}

export const getPokemonAnimatedSpriteUrl = (name: string) => {
  return `${ANIMATED_SPRITE_BASE_URL}/${getPokemonSpriteSlug(name)}.gif`
}

export const getLocalPokemonSpriteUrl = (name: string) => {
  return `${import.meta.env.BASE_URL}images/pokemon/${name.toLowerCase().replace(/ /g, '_')}.png`
}
