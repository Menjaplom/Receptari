import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string(),
  units: z.number().optional(),
  measure: z.string().optional()
})

export type Ingredient = z.infer<typeof ingredientSchema>

//export type NewIngredientType = IngredientType & { key: number }

export class NewIngredient {
  dragId: number
  name: string
  units?: number
  measure?:  string

  constructor(ingredient: Ingredient, dragId: number) {
    this.dragId = dragId
    this.name = ingredient.name
    this.units = ingredient.units
    this.measure = ingredient.measure
  }

  exportMedia(): Ingredient {
    return {
      'name': this.name,
      'units': this.units,
      'measure': this.measure
    }
  }
}
