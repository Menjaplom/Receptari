import  * as table from "./sharedLiterals"

export const insertRecipe =
  `INSERT INTO ` + table.recipes + ` VALUES (
    :name,
    :description,
    :yield,
    :prepTime,
    :cookTime,
    :difficulty
  ) RETURNING id`

export const insertRecipeMedia =
  `INSERT INTO ` + table.recipeMedia + ` VALUES (
    :recipeId,
    :url,
    :position,
    :footer
  )`

export const insertRecipeCategory =
  `INSERT INTO ` + table.recipeCategory + ` VALUES (
    :recipeId,
    :category
  )`

export const insertTag = 
  `INSERT INTO ` + table.tags + ` VALUES (
    :tag,
    :color
  )`

export const insertRecipeTag = 
  `INSERT INTO ` + table.recipeTags + ` VALUES (
    :recipeId,
    :tag
  )`

export const insertTool = 
  `INSERT IGNORE INTO ` + table.tools + ` VALUES (
    :tool
  )`

export const insertRecipeTool = 
  `INSERT INTO ` + table.recipeTools + ` VALUES (
    :recipeId,
    :tool,
    :description
  )`

export const insertIngredient = 
  `INSERT IGNORE INTO ` + table.ingredients + ` VALUES (
    :name
  )`

export const insertRecipeIngredient = 
  `INSERT INTO ` + table.recipeIngredients + ` VALUES (
    :recipeId,
    :ingredient,
    :position,
    :units,
    :measure
  )`

export const insertDirection = 
  `INSERT INTO ` + table.directions + ` VALUES (
    :description
  ) RETURNING id`

export const insertRecipeDirection = 
  `INSERT INTO ` + table.recipeDirections + ` VALUES (
    :recipeId,
    :directionId,
    :position
  )`

export const insertDirectionMedia = 
  `INSERT INTO ` + table.directionMedia + ` VALUES (
    :directionId,
    :position,
    :url,
    :footer
  )`

export const insertRecipeComponent =
`INSERT INTO ` + table.recipeComponents + ` VALUES (
    :baseRecipe,
    :component,
    :position
  )`