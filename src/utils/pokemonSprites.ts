const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown'

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

export const getPokemonSpriteUrl = (name: string) => {
  return `${SPRITE_BASE_URL}/${getPokemonSpriteSlug(name)}.gif`
}

export const getLocalPokemonSpriteUrl = (name: string) => {
  return `${import.meta.env.BASE_URL}images/pokemon/${name.toLowerCase().replace(/ /g, '_')}.png`
}
