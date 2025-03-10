import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string(),
  units: z.number().optional(),
  measure: z.string().optional()
})

export type IngredientType = z.infer<typeof ingredientSchema>

export type NewIngredientType = IngredientType & { key: number }
