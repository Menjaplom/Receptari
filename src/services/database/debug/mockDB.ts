import type { Recipe } from "@/types/Recipe";
import type { dbConnection } from "../dbInterface";
import type { recipeThumbnailType } from "@/types/RecipeThumbnail";

export class MockDB implements dbConnection {
    ready: boolean;
    recipeList: Array<Recipe>

    constructor() {
    this.ready = false
    this.recipeList = []
    }

    connect(_: string): Promise<void> {
        this.ready = true
        return Promise.resolve()
    }

    addRecipe(recipe: Recipe): Promise<void> {
        throw new Error("Method not implemented.");
    }
    

    listAllRecipes(): Promise<Array<recipeThumbnailType>> {
        let thumbList = []
        for (let recipe of this.recipeList){
            thumbList.push({'id': recipe.id,
                'title':  recipe.title,
                'media':  '/src/static/debug/recipeThumbnail.jpg'
            })
        }
        return Promise.resolve(thumbList)
    }

    insertRecipe(recipe: Recipe): Promise<recipeThumbnailType> {
        this.recipeList.push(recipe)
        let thumbnail = {'id': recipe.id,
            'title':  recipe.title,
            'media':  '/src/static/debug/recipeThumbnail.jpg'
        }
        return Promise.resolve(thumbnail)
    }

}