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
