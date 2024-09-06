import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string(),
  units: z.number().optional(),
  measure: z.string().optional()
})

export type IngredientType = z.infer<typeof ingredientSchema>

export type NewIngredientType = IngredientType & { key: number }
/*
class Ingredient {
  key: number
  name: string
  units?: number
  measure?: string

  constructor(key: number, name: string, units?: number, measure?: string) {
    this.key = key
    this.name = name
    this.units = units
    this.measure = measure
  }
}

export default Ingredient*/
