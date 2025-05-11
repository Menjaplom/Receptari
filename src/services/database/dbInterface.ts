import { type Recipe } from '@/types/Recipe'
import type { RecipeThumbnail } from '@/types/RecipeThumbnail'
import type { Tag } from '@/types/Tag'

export interface DBConnection {
  ready: boolean

  connect(dbName: string): Promise<void>

  addRecipe(recipe: Recipe): Promise<RecipeThumbnail>

  listAllRecipes(): Promise<Array<RecipeThumbnail>>

  getRecipe(recipeId: number): Promise<Recipe>
  
  getAllTags(): Promise<Tag[]>
}
