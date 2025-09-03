import { type Recipe } from '@/types/Recipe'
import type { RecipeThumbnail } from '@/types/RecipeThumbnail'
import type { Tag } from '@/types/Tag'

export interface DBConnection {
  ready: boolean

  connect(): Promise<void>

  waitForConnection(): Promise<void>

  addRecipe(recipe: Recipe): Promise<RecipeThumbnail>

  listAllRecipes(): Promise<Array<RecipeThumbnail>>

  getRecipe(recipeId: number): Promise<Recipe>
  
  getAllCategories(): Promise<string[]>

  getAllTags(): Promise<Tag[]>

  getAllTools(): Promise<string[]>
}
