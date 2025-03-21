import type { Database } from "sql.js"
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe"

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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    directionId INTEGER,
    position INTEGER NOT NULL,
    url TEXT NOT NULL,
    footer TEXT,
    FOREIGN KEY (directionId) REFERENCES ` + tableDirections + `(id)
  ) STRICT`

// Table insertion literals
const insertDirection = 
  `INSERT INTO ` + tableDirections + `(description) VALUES (
    :description
  ) RETURNING id`

const insertRecipeDirection = 
  `INSERT INTO ` + tableRecipeDirections + ` VALUES (
    :recipeId,
    :directionId,
    :position
  )`

const insertDirectionMedia = 
  `INSERT INTO ` + tableDirectionMedia + `(directionId, position, url, footer) VALUES (
    :directionId,
    :position,
    :url,
    :footer
  )`

// Insertions
export function insertDirections(db: Database, recipe: Recipe, recipeId: number): void {
  const stmtDirection = db.prepare(insertDirection);
  const stmtRecipeDirections = db.prepare(insertRecipeDirection);
  const stmtDirectionMedia = db.prepare(insertDirectionMedia);
  try {
    recipe.directions.forEach((dir, idx) => {
      const directionId = stmtDirection.getAsObject({
        ":description": dir.description
      })
      stmtRecipeDirections.run({
        ":recipeId": recipeId,
        ":directionId": directionId['id'],
        ":position": idx
      })
      dir.media.forEach((media, mIdx) => {
        stmtDirectionMedia.run({
          ":directionId": directionId['id'],
          ":position": mIdx,
          ":url": media.url,
          ":footer": media.footer ?? null
        })
      })
    });
  }
  catch (e) {
    throw new Error('Recipe direction insertion failed. Cause: ' + e)
  }
  finally {
    stmtDirection.free();
    stmtRecipeDirections.free();
    stmtDirectionMedia.free();
  }
}