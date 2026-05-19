import type { Language } from '../i18n/translations'

const spanishModules = import.meta.glob('../data/**/*.json', { eager: true })
const englishModules = import.meta.glob('../data-en/**/*.json', { eager: true })

const getModuleData = (module: unknown) => {
  if (module && typeof module === 'object' && 'default' in module) {
    return (module as { default: unknown }).default
  }

  return module
}

const getDataModules = (language: Language) => (language === 'en' ? englishModules : spanishModules)
const getFallbackModules = (language: Language) => (language === 'en' ? spanishModules : englishModules)
const getDataPath = (language: Language, regionId: string, leaderId: string, fileName: string) => (
  language === 'en'
    ? `../data-en/${regionId}/${leaderId}/${fileName}`
    : `../data/${regionId}/${leaderId}/${fileName}`
)

const getFallbackPath = (language: Language, regionId: string, leaderId: string, fileName: string) => (
  language === 'en'
    ? `../data/${regionId}/${leaderId}/${fileName}`
    : `../data-en/${regionId}/${leaderId}/${fileName}`
)

/**
 * Custom hook to handle dynamic imports of Pokemon data files
 */
export const useDynamicImports = () => {
  /**
   * Gets Pokemon files for a specific region and leader
   * @param regionId - The ID of the region
   * @param leaderId - The ID of the leader
   * @param language - Current language
   * @returns Array of file names
   */
  const getPokemonFiles = async (regionId: string, leaderId: string, language: Language = 'es'): Promise<string[]> => {
    try {
      const modules = getDataModules(language)
      const fallbackModules = getFallbackModules(language)
      const pattern = language === 'en'
        ? `../data-en/${regionId}/${leaderId}/`
        : `../data/${regionId}/${leaderId}/`
      const fallbackPattern = language === 'en'
        ? `../data/${regionId}/${leaderId}/`
        : `../data-en/${regionId}/${leaderId}/`
      const files = Object.keys(modules)
        .filter((key) => key.includes(pattern))
        .map((key) => key.split('/').pop() || '')

      if (files.length > 0) return files

      return Object.keys(fallbackModules)
        .filter((key) => key.includes(fallbackPattern))
        .map((key) => key.split('/').pop() || '')
    } catch (error) {
      console.error(`Error getting files for ${regionId}/${leaderId}:`, error)
      return []
    }
  }

  const getPokemonData = async (regionId: string, leaderId: string, fileName: string, language: Language = 'es') => {
    const modules = getDataModules(language)
    const fallbackModules = getFallbackModules(language)
    const path = getDataPath(language, regionId, leaderId, fileName)
    const fallbackPath = getFallbackPath(language, regionId, leaderId, fileName)

    return getModuleData(modules[path] || fallbackModules[fallbackPath])
  }

  return { getPokemonFiles, getPokemonData }
}
