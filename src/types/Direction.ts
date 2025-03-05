import { z } from 'zod'
import { mediaSchema, NewMedia } from './Media'

export const directionSchema = z.object({
  description: z.string(),
  media: z.array(mediaSchema)
})

export type Direction = z.infer<typeof directionSchema>

export const emptyDirection = { description: '', media: [] }

export class NewDirection {
  dragId: number
  description: string
  media: Array<NewMedia>

  constructor(d: Direction, dragId: number) {
    this.dragId = dragId
    this.description = d.description
    this.media = d.media.map((m, i) => new NewMedia(m, i))
  }

  exportDirection(): Direction {
    return {
      'description': this.description,
      'media': this.media.map((m) => m.exportMedia())
    }
  }
}