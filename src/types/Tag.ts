import { z } from 'zod'

export const tagSchema = z.object({
  tag: z.string(),
  color:  z.string()
})

export type Tag = z.infer<typeof tagSchema>