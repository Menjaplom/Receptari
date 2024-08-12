import NewMediaData, { type NewMediaDataType } from './NewMediaData'

interface NewDirectionInter {
  key: Number
  description: String
  media: Array<NewMediaData>
}

export function isNewDirectionInter(value: unknown): value is NewDirectionInter {
  if (!value || typeof value !== 'object') {
    return false
  }
  const object = value as Record<string, unknown>

  return (
    typeof object.key === 'number' && typeof object.description === 'string' /* &&
    Array.isArray(object.media) &&
    object.media.every((m) => typeof m === 'string')*/ // TODO: Check whether the media type is correct
  )
}

export type NewDirectionType = {
  key: Number
  description: String
  media: Array<NewMediaDataType>
}

class NewDirection {
  key: Number
  description: String
  media: Array<NewMediaData>

  constructor(key: number, description: string, media: Array<NewMediaData>) {
    this.key = key
    this.description = description
    this.media = media
  }
}

export default NewDirection
