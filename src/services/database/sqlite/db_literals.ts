export const enableForeingKeys = `PRAGMA foreign_keys = ON`

export const createTableRecipes = `CREATE TABLE Recipes IF NOT EXISTS (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    yield INTEGER,
    prepTime INTEGER,
    cookTime INTEGER,
    difficulty INTEGER
    )`

export const createTableRecipeMedia = `CREATE TABLE RecipeMedia  IF NOT EXISTS (
    recipeId INTEGER,
    id INTEGER,
    url TEXT NOT NULL,
    position INTEGER NOT NULL,
    FOREIGN KEY(recipeId) REFERENCES Recipes(id),
    PRIMARY KEY (recipeId, id)
    )`

export const createTableCategories = `CREATE TABLE Categories IF NOT EXISTS (
    category TEXT PRIMARY KEY
    )`

export const createTableRecipeCategory = `CREATE TABLE RecipeCategory IF NOT EXISTS (
    recipeId INTEGER,
    category TEXT,
    FOREIGN KEY(recipeId) REFERENCES Recipes(id),
    FOREIGN KEY(category) REFERENCES Categories(category),
    PRIMARY KEY (recipeId, category)
    )`

export const createTableTags = `CREATE TABLE Tags IF NOT EXISTS (
    tag TEXT PRIMARY KEY,
    color TEXT NOT NULL
    )`

export const createTableRecipeTags = `CREATE TABLE RecipeTags IF NOT EXISTS (
    recipeId INTEGER,
    tag TEXT,
    FOREIGN KEY(recipeId) REFERENCES Recipes(id),
    FOREIGN KEY(tag) REFERENCES Tags(tag),
    PRIMARY KEY (recipeId, tag)
    )`

export const createTableTools = `CREATE TABLE Tools IF NOT EXISTS (
    tool TEXT PRIMARY KEY
    )`

export const createTableRecipeTools = `CREATE TABLE RecipeTools IF NOT EXISTS (
    recipeId INTEGER,
    tool TEXT,
    FOREIGN KEY(recipeId) REFERENCES Recipes(id),
    FOREIGN KEY(tool) REFERENCES Tools(tool),
    PRIMARY KEY (recipeId, tool)
    )`

export const createTableIngredients = `CREATE TABLE Ingredients IF NOT EXISTS (
    name TEXT PRIMARY KEY
    )`

export const createTableRecipeIngredients = `CREATE TABLE RecipeIngredients IF NOT EXISTS (
    recipeId INTEGER,
    ingredient text PRIMARY KEY,
    position INTEGER NOT NULL,
    units INTEGER,
    measure TEXT
    FOREIGN KEY(recipeId) REFERENCES Recipes(id),
    FOREIGN KEY(ingredient) REFERENCES Ingredients(name),
    PRIMARY KEY (recipeId, ingredient)
    )`

export const createTableDirections = `CREATE TABLE Directions IF NOT EXISTS (
    id INTEGER PRIMARY KEY,
    description TEXT NOT NULL,
    )`

export const createTableRecipeDirections = `CREATE TABLE RecipeDirections IF NOT EXISTS (
    recipeId INTEGER,
    directionId INTEGER,
    FOREIGN KEY(recipeId) REFERENCES Recipes(id),
    FOREIGN KEY(directionId) REFERENCES Directions(id),
    PRIMARY KEY (recipeId, directionId)
    )`

export const createTableDirectionMedia = `CREATE TABLE DirectionMedia IF NOT EXISTS (
    directionId INTEGER,
    url TEXT NOT NULL,
    position INTEGER NOT NULL,
    FOREIGN KEY(recipeId) REFERENCES Recipes(id),
    PRIMARY KEY (recipeId, id)
    )`

export const createTableRecipeComponents  = `CREATE TABLE RecipeComponents IF NOT EXISTS (
    baseRecipe INTEGER,
    component INTEGER,
    position INTEGER NOT NULL,
    FOREIGN KEY(baseRecipe) REFERENCES Recipes(id),
    FOREIGN KEY(component) REFERENCES Recipes(id),
    PRIMARY KEY (baseRecipe, component)
    )`