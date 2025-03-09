import { z } from 'zod'

export const recipeThumbnailSchema = z.object({
  id: z.number(),
  title:  z.string(),
  media:  z.string()
})

export type RecipeThumbnail = z.infer<typeof recipeThumbnailSchema>