import type { Pokemon, Tricks } from '../interfaces/Pokemon'

type ValidationContext = {
  regionId: string
  leaderId: string
  fileName: string
}

const createFallbackPokemon = (context: ValidationContext): Pokemon => ({
  id: context.fileName.replace('.json', ''),
  name: context.fileName.replace('.json', ''),
  initialMove: 'SIN ESTRATEGIA DEFINIDA',
  tricks: [],
})

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const normalizeText = (value: unknown) => {
  return typeof value === 'string' ? value.trim() : ''
}

const validateTricks = (value: unknown, contextLabel: string): Tricks[] => {
  if (!Array.isArray(value)) {
    console.warn(`[strategy-validation] ${contextLabel}: tricks must be an array.`)
    return []
  }

  return value
    .map((item, index): Tricks | null => {
      if (!isRecord(item)) {
        console.warn(`[strategy-validation] ${contextLabel}: trick #${index + 1} is not valid.`)
        return null
      }

      const detail = normalizeText(item.detail)

      if (!detail) {
        console.warn(`[strategy-validation] ${contextLabel}: trick #${index + 1} is missing detail.`)
        return null
      }

      return {
        detail,
        variant: validateTricks(item.variant ?? [], `${contextLabel} > trick #${index + 1}`),
      }
    })
    .filter((item): item is Tricks => item !== null)
}

export const validatePokemonStrategy = (value: unknown, context: ValidationContext): Pokemon => {
  const contextLabel = `${context.regionId}/${context.leaderId}/${context.fileName}`

  if (!isRecord(value)) {
    console.warn(`[strategy-validation] ${contextLabel}: file is not a valid object.`)
    return createFallbackPokemon(context)
  }

  const name = normalizeText(value.name)
  const initialMove = normalizeText(value.initialMove)
  const id = normalizeText(value.id) || name.toLowerCase() || context.fileName.replace('.json', '')

  if (!name) {
    console.warn(`[strategy-validation] ${contextLabel}: missing name.`)
  }

  if (!initialMove) {
    console.warn(`[strategy-validation] ${contextLabel}: missing initialMove.`)
  }

  return {
    id,
    name: name || context.fileName.replace('.json', ''),
    image: normalizeText(value.image) || undefined,
    initialMove: initialMove || 'SIN ESTRATEGIA DEFINIDA',
    tricks: validateTricks(value.tricks, contextLabel),
  }
}
