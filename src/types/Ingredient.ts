interface IngredientInter {
  name: string
  units?: number
  measure?: string
}

export type NewIngredientType = {
  key: number
  name: string
  units?: number
  measure?: string
}

export function isIngredientInter(value: unknown): value is IngredientInter {
  if (!value || typeof value !== 'object') {
    return false
  }
  const object = value as Record<string, unknown>

  return (
    typeof object.name === 'string' &&
    typeof object.units === 'number' &&
    typeof object.measure === 'string'
  )
}

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

export default Ingredient
