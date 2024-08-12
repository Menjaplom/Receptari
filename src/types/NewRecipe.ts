import Ingredient, { isIngredientInter, type NewIngredientType } from './Ingredient'
import NewDirection, { isNewDirectionInter, type NewDirectionType } from './NewDirection'

export interface NewRecipeInter {
  title: string
  media: Array<String>
  category: Array<String>
  tags: Array<String>
  recipeYield: Number
  prepTime: String
  cookTime: String
  tools: Array<String>
  difficulty: Number
  ingredients: Array<Ingredient>
  direction: Array<NewDirection>
  components: Array<NewRecipe>
}

export type NewRecipeType = {
  title: string
  media: Array<String>
  category: Array<String>
  tags: Array<String>
  recipeYield: Number
  prepTime: String
  cookTime: String
  tools: Array<String>
  difficulty: Number
  ingredients: Array<NewIngredientType>
  direction: Array<NewDirectionType>
  components: Array<NewRecipeType>
}

export function isNewRecipeInter(value: unknown): value is NewRecipeInter {
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
    object.direction.every(isNewDirectionInter) &&
    Array.isArray(object.components) &&
    object.components.every(isNewRecipeInter)
  )
}

export function isRecipeInterArray(value: unknown): value is Array<NewRecipeInter> {
  return Array.isArray(value) && value.every(isNewRecipeInter)
}

class NewRecipe {
  title: String
  media: Array<String>
  category: Array<String>
  tags: Array<String>
  recipeYield: Number
  prepTime: String
  cookTime: String
  tools: Array<String>
  difficulty: Number
  ingredients: Array<Ingredient>
  direction: Array<NewDirection>
  components: Array<NewRecipe>

  constructor(recipeInter: NewRecipeInter) {
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
  }
}

export default NewRecipe
