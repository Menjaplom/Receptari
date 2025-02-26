import { z } from 'zod'

export const tagSchema = z.object({
  tag: z.string(),
  color:  z.string()
})

export type TagType = z.infer<typeof tagSchema>