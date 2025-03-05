import { NewIngredient, ingredientSchema } from './Ingredient'
import { directionSchema, NewDirection } from './Direction'
import { z } from 'zod'
import { tagSchema, type TagType } from './Tag'
import { toolSchema, type Tool } from './Tool'
import { mediaSchema, NewMedia } from './Media'

export const recipeBaseSchema = z.object({
  id: z.number(),
  title: z.string(),
  media: z.array(mediaSchema),
  category: z.string().array(),
  tags: z.array(tagSchema),
  description: z.string().optional(),
  recipeYield: z.number().optional(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  tools:z.array(toolSchema),
  difficulty: z.number().optional(),
  ingredients: z.array(ingredientSchema),
  directions: z.array(directionSchema)
})

export type Recipe = z.infer<typeof recipeBaseSchema> & {
  components: Recipe[]
}

export const recipeSchema: z.ZodType<Recipe> = recipeBaseSchema.extend({
  components: z.lazy(() => recipeSchema.array())
})

export const emptyRecipe: Recipe =  {
  id: -1,
  title: "",
  media: [],
  category: [],
  tags: [],
  tools: [],
  ingredients:[],
  directions: [],
  components: []
}

/*export type RecipeRawMedia = {
  base: RawMedia[],
  directions: Array<RawMedia[]>,
  components: RecipeRawMedia | null
}

export const emptyRecRawMed: RecipeRawMedia = {
  base: [],
  directions: [[]],
  components: null
}*/

// TODO: Add recursive component/newrecipe
export class NewRecipe {
  id: number
  title: string
  media: NewMedia[]
  category: string[]
  tags: TagType[]
  description?: string
  recipeYield?: number
  prepTime?: string
  cookTime?: string
  tools: Tool[]
  difficulty?: number
  ingredients: NewIngredient[]
  directions: NewDirection[]
  components: NewRecipe[]

  constructor(recipe: Recipe){
    this.id = recipe.id
    this.title = recipe.title
    this.media = recipe.media.map((m, idx) => new NewMedia(m, idx))
    this.category = recipe.category
    this.tags = recipe.tags
    this.description = recipe.description
    this.recipeYield = recipe.recipeYield
    this.prepTime = recipe.prepTime
    this.cookTime = recipe.cookTime
    this.tools = recipe.tools
    this.difficulty = recipe.difficulty
    this.ingredients = recipe.ingredients.map((ingr, idx) => new NewIngredient(ingr, idx))
    this.directions = recipe.directions.map((dir, idx) => new NewDirection(dir, idx))
    this.components = recipe.components.map((c) => new NewRecipe(c)) //TODO: CHECK REICPE ID DEFINES DRAGID FOR EACH CHILD
  }
}