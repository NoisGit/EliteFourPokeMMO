const TRAINER_SPRITES_TO_CLEAN = new Set(['lorelei', 'bruno', 'agatha', 'lance'])
const cleanedTrainerSpriteCache = new Map<string, Promise<string>>()

export const getTrainerSpriteKey = (name: string) => {
  return name.toLowerCase().replace(/ /g, '_')
}

export const getLocalTrainerSpriteUrl = (name: string) => {
  return `${import.meta.env.BASE_URL}images/lideres/${getTrainerSpriteKey(name)}.png`
}

export const shouldCleanTrainerSprite = (name: string) => {
  return TRAINER_SPRITES_TO_CLEAN.has(getTrainerSpriteKey(name))
}

const isNearWhite = (data: Uint8ClampedArray, index: number, threshold = 235) => {
  return data[index] >= threshold && data[index + 1] >= threshold && data[index + 2] >= threshold
}

const getPixelIndex = (x: number, y: number, width: number) => {
  return (y * width + x) * 4
}

const clampColor = (value: number) => {
  return Math.max(0, Math.min(255, value))
}

const cleanWhiteBackground = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d', { willReadFrequently: true })

  if (!context) {
    return image.src
  }

  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  context.drawImage(image, 0, 0)

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  const { data, width, height } = imageData
  const visited = new Uint8Array(width * height)
  const queue: number[] = []

  const enqueue = (x: number, y: number) => {
    const pixel = y * width + x
    const index = pixel * 4

    if (visited[pixel] || !isNearWhite(data, index)) return

    visited[pixel] = 1
    queue.push(pixel)
  }

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0)
    enqueue(x, height - 1)
  }

  for (let y = 0; y < height; y += 1) {
    enqueue(0, y)
    enqueue(width - 1, y)
  }

  while (queue.length > 0) {
    const pixel = queue.pop()
    if (pixel === undefined) continue

    const x = pixel % width
    const y = Math.floor(pixel / width)

    if (x > 0) enqueue(x - 1, y)
    if (x < width - 1) enqueue(x + 1, y)
    if (y > 0) enqueue(x, y - 1)
    if (y < height - 1) enqueue(x, y + 1)
  }

  const edgePixels = new Set<number>()

  for (let pixel = 0; pixel < visited.length; pixel += 1) {
    if (!visited[pixel]) continue

    const index = pixel * 4
    data[index + 3] = 0

    const x = pixel % width
    const y = Math.floor(pixel / width)

    for (let offsetY = -2; offsetY <= 2; offsetY += 1) {
      for (let offsetX = -2; offsetX <= 2; offsetX += 1) {
        const nextX = x + offsetX
        const nextY = y + offsetY

        if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) continue

        const nextPixel = nextY * width + nextX
        if (!visited[nextPixel]) edgePixels.add(nextPixel)
      }
    }
  }

  edgePixels.forEach((pixel) => {
    const index = pixel * 4
    const red = data[index]
    const green = data[index + 1]
    const blue = data[index + 2]
    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)
    const mean = (red + green + blue) / 3
    const saturation = max - min

    if (mean < 170 && saturation > 85) return

    const differenceFromWhite = Math.max(255 - red, 255 - green, 255 - blue)
    const alpha = Math.max(18, Math.min(255, (differenceFromWhite / 115) * 255))

    if (alpha >= data[index + 3]) return

    const normalizedAlpha = Math.max(alpha / 255, 0.01)

    data[index] = clampColor((red - (1 - normalizedAlpha) * 255) / normalizedAlpha)
    data[index + 1] = clampColor((green - (1 - normalizedAlpha) * 255) / normalizedAlpha)
    data[index + 2] = clampColor((blue - (1 - normalizedAlpha) * 255) / normalizedAlpha)
    data[index + 3] = alpha
  })

  context.putImageData(imageData, 0, 0)

  return canvas.toDataURL('image/png')
}

export const getCleanTrainerSpriteUrl = (source: string) => {
  if (cleanedTrainerSpriteCache.has(source)) {
    return cleanedTrainerSpriteCache.get(source) as Promise<string>
  }

  const cleanedSprite = new Promise<string>((resolve) => {
    const image = new Image()

    image.onload = () => {
      try {
        resolve(cleanWhiteBackground(image))
      } catch (error) {
        console.warn('[trainer-sprite-cleanup] Could not clean trainer sprite:', source, error)
        resolve(source)
      }
    }

    image.onerror = () => resolve(source)
    image.src = source
  })

  cleanedTrainerSpriteCache.set(source, cleanedSprite)

  return cleanedSprite
}
