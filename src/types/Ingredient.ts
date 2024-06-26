class Ingredient {
  name: string
  units?: number
  measure?: string

  constructor(name: string, units?: number, measure?: string) {
    this.name = name
    this.units = units
    this.measure = measure
  }
}

export default Ingredient
