import { type Recipe } from '@/types/Recipe'
import type { RecipeThumbnail } from '@/types/RecipeThumbnail'

export interface DBConnection {
  ready: boolean

  connect(dbName: string): Promise<void>

  addRecipe(recipe: Recipe): Promise<RecipeThumbnail> // TODO: Add proper return value

  listAllRecipes(): Promise<Array<RecipeThumbnail>>

}
