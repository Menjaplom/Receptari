import type { MediaUrl } from './MediaUrl'
import { z } from 'zod'

export const directionSchema = z.object({
  description: z.string(),
  media: z.string().array()
})

export type DirectionType = z.infer<typeof directionSchema>
