import type NewRecipe from '@/types/NewRecipe'

export interface dbConnection {
  ready: boolean

  connect(dbName: string): Promise<void>

  addRecipe(recipe: NewRecipe): Promise<void> // TODO: Add proper return value
}
