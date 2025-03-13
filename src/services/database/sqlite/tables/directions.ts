import { tableRecipes } from "./recipes"

// Table names
export const tableDirections = `Directions`
export const tableRecipeDirections = `RecipeDirections`
export const tableDirectionMedia = `DirectionMedia`

// Table creation literals
export const createTableDirections =
  `CREATE TABLE IF NOT EXISTS ` + tableDirections + ` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL
  ) STRICT`

export const createTableRecipeDirections =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeDirections + ` (
    recipeId INTEGER,
    directionId INTEGER,
    position INTEGER NOT NULL,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (directionId) REFERENCES ` + tableDirections + `(id),
    PRIMARY KEY (recipeId, directionId)
  ) STRICT`

export const createTableDirectionMedia =
  `CREATE TABLE IF NOT EXISTS ` + tableDirectionMedia + ` (
    directionId INTEGER,
    id INTEGER AUTOINCREMENT,
    position INTEGER NOT NULL,
    url TEXT NOT NULL,
    footer TEXT,
    FOREIGN KEY (directionId) REFERENCES ` + tableDirections + `(id),
    PRIMARY KEY (directionId, id)
  ) STRICT`

// Table insertion literals
export const insertDirection = 
  `INSERT INTO ` + tableDirections + ` VALUES (
    :description
  ) RETURNING id`

export const insertRecipeDirection = 
  `INSERT INTO ` + tableRecipeDirections + ` VALUES (
    :recipeId,
    :directionId,
    :position
  )`

export const insertDirectionMedia = 
  `INSERT INTO ` + tableDirectionMedia + ` VALUES (
    :directionId,
    :position,
    :url,
    :footer
  )`
