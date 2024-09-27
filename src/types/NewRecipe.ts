import { type NewIngredientType } from './Ingredient'
import { type NewDirectionType } from './NewDirection'
import type { NewMediaDataType } from './NewMediaData'
import { type RecipeType } from './Recipe'

class NewRecipe {
  title: string
  media: Array<NewMediaDataType>
  category: Array<string>
  tags: Array<string>
  recipeYield?: number
  prepTime?: string
  cookTime?: string
  tools?: Array<string>
  difficulty?: number
  ingredients: Array<NewIngredientType>
  directions: Array<NewDirectionType>
  components: Array<NewRecipe>

  constructor(recipeInter: RecipeType) {
    this.title = recipeInter.title
    this.media = recipeInter.media.map((val, idx) => {
      return { file: undefined, url: val, order: idx }
    })
    this.category = recipeInter.category
    this.tags = recipeInter.tags
    this.recipeYield = recipeInter.recipeYield
    this.prepTime = recipeInter.prepTime
    this.cookTime = recipeInter.cookTime
    this.tools = recipeInter.tools
    this.difficulty = recipeInter.difficulty
    this.ingredients = recipeInter.ingredients.map((val, idx) => {
      return { name: val.name, units: val.units, measure: val.measure, key: idx }
    })
    this.directions = recipeInter.directions.map((val, idx) => {
      return {
        description: val.description,
        media: val.media.map((m_val, m_idx) => {
          return { file: undefined, url: m_val, order: m_idx }
        }),
        key: idx
      }
    })
    this.components = recipeInter.components.map((val) => {
      return new NewRecipe(val)
    })
  }

  outputRecipe(): RecipeType {
    return {
      title: this.title,
      media: this.media.map((val) => {
        return val.url
      }),
      category: this.category,
      tags: this.tags,
      recipeYield: this.recipeYield,
      prepTime: this.prepTime,
      cookTime: this.cookTime,
      tools: this.tools,
      difficulty: this.difficulty,
      ingredients: this.ingredients.map((val) => {
        return { name: val.name, units: val.units, measure: val.measure }
      }),
      directions: this.directions.map((val) => {
        return {
          description: val.description,
          media: val.media.map((m_val) => {
            return m_val.url
          })
        }
      }),
      components: this.components.map((val) => {
        return val.outputRecipe()
      })
    }
  }
}

export default NewRecipe
