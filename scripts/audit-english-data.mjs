import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const targetDir = path.join(rootDir, 'src', 'data-en')

const spanishPatterns = [
  /\b(luego|después|cuando|si sale|frente a|contra)\b/i,
  /\b(hasta|para|estrategia|ruta|rival|objeto|movimiento|movimientos)\b/i,
  /\b(debilitado|debilitada|crítico|pendiente de confirmar|se sugiere|se recomienda)\b/i,
  /\b(entrada de|entrada segura|para curar|al máximo|hasta que quede)\b/i,
  /\b(Maquinación|Tambor|Danza Aleteo|Otra Vez|Truco|Trampa Rocas)\b/i,
  /\b(Velocidad X|Precisión X|Ataque X|Especial X)\b/i,
]

const walkJsonFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...await walkJsonFiles(entryPath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(entryPath)
    }
  }

  return files
}

const collectStrategyTexts = (strategy, prefix = '') => {
  const texts = []

  if (strategy.initialMove) {
    texts.push([`${prefix}initialMove`, strategy.initialMove])
  }

  const walkTricks = (tricks = [], pathPrefix = 'tricks') => {
    tricks.forEach((trick, index) => {
      const currentPath = `${pathPrefix}[${index}]`
      texts.push([`${currentPath}.detail`, trick.detail])
      walkTricks(trick.variant || [], `${currentPath}.variant`)
    })
  }

  walkTricks(strategy.tricks || [])
  return texts
}

const main = async () => {
  const files = await walkJsonFiles(targetDir)
  const findings = []

  for (const filePath of files) {
    const relativePath = path.relative(targetDir, filePath)
    const strategy = JSON.parse(await readFile(filePath, 'utf8'))
    const texts = collectStrategyTexts(strategy)

    texts.forEach(([fieldPath, text]) => {
      const match = spanishPatterns.find((pattern) => pattern.test(text))

      if (match) {
        findings.push({ relativePath, fieldPath, text })
      }
    })
  }

  if (findings.length === 0) {
    console.log('English data audit passed. No Spanish leftovers found.')
    return
  }

  console.error(`English data audit found ${findings.length} possible Spanish leftovers:`)
  findings.slice(0, 80).forEach((finding) => {
    console.error(`- ${finding.relativePath} :: ${finding.fieldPath}`)
    console.error(`  ${finding.text}`)
  })

  if (findings.length > 80) {
    console.error(`...and ${findings.length - 80} more.`)
  }

  process.exit(1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
