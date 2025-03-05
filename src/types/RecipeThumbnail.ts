import { z } from 'zod'

export const recipeThumbnailSchema = z.object({
  id: z.number(),
  title:  z.string(),
  media:  z.string()
})

export type recipeThumbnailType = z.infer<typeof recipeThumbnailSchema>