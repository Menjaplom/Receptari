import NewRecipe from '@/types/NewRecipe'
import type { recipeThumbnailType } from '@/types/RecipeThumbnail'
import type { insertRecipe } from './sqlite/insertionLiterals'

export interface dbConnection {
  ready: boolean

  connect(dbName: string): Promise<void>

  addRecipe(recipe: NewRecipe): Promise<void> // TODO: Add proper return value

  listAllRecipes(): Promise<Array<recipeThumbnailType>>

  insertRecipe(recipe: NewRecipe): Promise<recipeThumbnailType>
}
