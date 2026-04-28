export const getTrainerSpriteKey = (name: string) => {
  return name.toLowerCase().replace(/ /g, '_')
}

export const getLocalTrainerSpriteUrl = (name: string) => {
  const spriteKey = getTrainerSpriteKey(name)

  return `${import.meta.env.BASE_URL}images/lideres/${spriteKey}.png`
}
