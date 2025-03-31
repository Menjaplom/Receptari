import { z } from 'zod'

export const yieldSchema = z.object({
  units: z.number().optional(),
  measure: z.string().optional()
})

export type Yield = z.infer<typeof yieldSchema>