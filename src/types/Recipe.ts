import { type IngredientType, ingredientSchema } from './Ingredient'
import { directionSchema } from './Direction'
import { z } from 'zod'

export const recipeBaseSchema = z.object({
  title: z.string(),
  media: z.string().array(),
  category: z.string().array(),
  tags: z.string().array(),
  recipeYield: z.number().optional(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  tools: z.string().array().optional(),
  difficulty: z.number().optional(),
  ingredients: z.array(ingredientSchema),
  directions: z.array(directionSchema)
})

export type RecipeType = z.infer<typeof recipeBaseSchema> & {
  components: RecipeType[]
}

export const recipeSchema: z.ZodType<RecipeType> = recipeBaseSchema.extend({
  components: z.lazy(() => recipeSchema.array())
})
/*
export function isRecipeInter(value: unknown): value is RecipeInter {
  if (!value || typeof value !== 'object') {
    return false
  }
  const object = value as Record<string, unknown>

  return (
    typeof object.title === 'string' &&
    Array.isArray(object.media) &&
    object.media.every((m) => typeof m === 'string') &&
    Array.isArray(object.category) &&
    object.category.every((c) => typeof c === 'string') &&
    Array.isArray(object.tags) &&
    object.tags.every((t) => typeof t === 'string') &&
    typeof object.recipeYield === 'number' &&
    typeof object.prepTime === 'string' &&
    typeof object.cookTime === 'string' &&
    Array.isArray(object.tools) &&
    object.tools.every((tool) => typeof tool === 'string') &&
    typeof object.difficulty === 'number' &&
    Array.isArray(object.ingredients) &&
    object.ingredients.every(isIngredientInter) &&
    Array.isArray(object.direction) &&
    object.direction.every(isDirectionInter) &&
    Array.isArray(object.components) &&
    object.components.every(isRecipeInter)
  )
}

export function isRecipeInterArray(value: unknown): value is Array<RecipeInter> {
  return Array.isArray(value) && value.every(isRecipeInter)
}*/

class Recipe {
  /*title: String
  media: Array<String>
  category: Array<String>
  tags: Array<String>
  recipeYield: Number
  prepTime: String
  cookTime: String
  tools: Array<String>
  difficulty: Number
  ingredients: Array<Ingredient>
  direction: Array<Direction>
  components: Array<Recipe>

  constructor(recipeInter: RecipeInter) {
    this.title = recipeInter['title']
    this.media = recipeInter['media']
    this.category = recipeInter['category']
    this.tags = recipeInter['tags']
    this.recipeYield = recipeInter['recipeYield']
    this.prepTime = recipeInter['prepTime']
    this.cookTime = recipeInter['cookTime']
    this.tools = recipeInter['tools']
    this.difficulty = recipeInter['difficulty']
    this.ingredients = recipeInter['ingredients']
    this.direction = recipeInter['direction']
    this.components = recipeInter['components']
  }*/
}

export default Recipe
