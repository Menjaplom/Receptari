import type { MediaUrl } from './MediaUrl'

interface DirectionInter {
  key: Number
  description: String
  media: Array<MediaUrl>
}

export function isDirectionInter(value: unknown): value is DirectionInter {
  if (!value || typeof value !== 'object') {
    return false
  }
  const object = value as Record<string, unknown>

  return (
    typeof object.key === 'number' &&
    typeof object.description === 'string' &&
    Array.isArray(object.media) &&
    object.media.every((m) => typeof m === 'string')
  )
}

class Direction {
  key: Number
  description: String
  media: Array<MediaUrl>

  constructor(key: number, description: string, media: Array<MediaUrl>) {
    this.key = key
    this.description = description
    this.media = media
  }
}

export default Direction
