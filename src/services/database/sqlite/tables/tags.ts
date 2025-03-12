import { tableRecipes } from "./recipes"

// Table names
export const tableTags = `Tags`
export const tableRecipeTags = `RecipeTags`

// Table creation literals
export const createTableTags =
  `CREATE TABLE IF NOT EXISTS ` + tableTags + ` (
      tag TEXT PRIMARY KEY,
      color TEXT NOT NULL
  )`

export const createTableRecipeTags =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeTags + ` (
    recipeId INTEGER,
    tag TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (tag) REFERENCES ` + tableTags + `(tag),
    PRIMARY KEY (recipeId, tag)
  )`

// Table insertion literals
export const insertTag = 
  `INSERT INTO ` + tableTags + ` VALUES (
    :tag,
    :color
  )`

export const insertRecipeTag = 
  `INSERT INTO ` + tableRecipeTags + ` VALUES (
    :recipeId,
    :tag
  )`