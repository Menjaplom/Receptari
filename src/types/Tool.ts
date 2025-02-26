import { z } from 'zod'

export const toolSchema = z.object({
  name: z.string(),
  description:  z.string().optional()
})

export type ToolType = z.infer<typeof toolSchema>