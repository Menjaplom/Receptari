import type { Database } from "sql.js"
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe"
import type { Direction } from "@/types/Direction"
import type { Media } from "@/types/Media"

// Table names
export const tableDirections = `Directions`
export const tableRecipeDirections = `RecipeDirections`
export const tableDirectionMedia = `DirectionMedia`

// Table creation literals
const createTableDirections =
  `CREATE TABLE IF NOT EXISTS ` + tableDirections + ` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL
  ) STRICT`

const createTableRecipeDirections =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeDirections + ` (
    recipeId INTEGER,
    directionId INTEGER,
    position INTEGER NOT NULL,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (directionId) REFERENCES ` + tableDirections + `(id),
    PRIMARY KEY (recipeId, directionId)
  ) STRICT`

const createTableDirectionMedia =
  `CREATE TABLE IF NOT EXISTS ` + tableDirectionMedia + ` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    directionId INTEGER,
    position INTEGER NOT NULL,
    url TEXT NOT NULL,
    footer TEXT,
    FOREIGN KEY (directionId) REFERENCES ` + tableDirections + `(id)
  ) STRICT`

export function createTablesDirections(db: Database) {
  db.run(createTableDirections)
  db.run(createTableRecipeDirections)
  db.run(createTableDirectionMedia)
}

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

// Queries
const selectRecipeDirections = 
  `SELECT D.* FROM ${insertDirection} D, ${insertRecipeDirection} RD
   WHERE RD.recipeId = :id AND RD.directionId = D.id
   ORDER BY RD.position ASC`

const selectDirectionMedia = 
  `SELECT url, footer FROM ${createTableDirectionMedia}
   WHERE directionId = :id
   ORDER BY position ASC`

export function getRecipeDirections(db: Database, recipeId: number, recipe: Recipe) {
  const stmtRecDir = db.prepare(selectRecipeDirections)
  const stmtDirMed = db.prepare(selectDirectionMedia)
  try {
    const result = stmtRecDir.getAsObject({':id': `${recipeId}`}) as unknown as {'id': string, 'description': string}[]

    for (let resDir of result) {
      let direction: Direction = {description: resDir.description, media: []}
      const media = stmtDirMed.getAsObject({':id': `${resDir.id}`}) as unknown as Media[]
      direction.media = media

      console.log('retrieved direction ' + JSON.stringify(direction))
      recipe.directions.push(direction)
    }
  }
  catch (e) {
    throw new Error('Get recipe direction failed. Cause: ' + e)
  }
}
