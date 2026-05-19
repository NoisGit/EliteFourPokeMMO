import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { localizeSpanishStrategyToEnglish } from './strategy-english-localizer.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const sourceDir = path.join(rootDir, 'src', 'data')
const targetDir = path.join(rootDir, 'src', 'data-en')

const shouldSkipFile = (filePath) => filePath.endsWith('config-region.json')

const translateTricks = (tricks = []) => tricks.map((trick) => ({
  ...trick,
  detail: localizeSpanishStrategyToEnglish(trick.detail),
  variant: translateTricks(trick.variant || []),
}))

const translateStrategy = (strategy) => ({
  ...strategy,
  initialMove: localizeSpanishStrategyToEnglish(strategy.initialMove),
  tricks: translateTricks(strategy.tricks || []),
})

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

const main = async () => {
  const files = await walkJsonFiles(sourceDir)
  let generatedCount = 0

  for (const filePath of files) {
    const relativePath = path.relative(sourceDir, filePath)

    if (shouldSkipFile(relativePath)) continue

    const source = JSON.parse(await readFile(filePath, 'utf8'))
    const target = translateStrategy(source)
    const targetPath = path.join(targetDir, relativePath)

    await mkdir(path.dirname(targetPath), { recursive: true })
    await writeFile(targetPath, `${JSON.stringify(target, null, 2)}\n`, 'utf8')
    generatedCount += 1
  }

  console.log(`Generated ${generatedCount} English strategy files.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
