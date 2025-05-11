import type { Recipe } from "@/types/Recipe";
import type { DBConnection } from "../dbInterface";
import type { RecipeThumbnail } from "@/types/RecipeThumbnail";
import type { Tag } from "@/types/Tag"
import { basicRecipe, boilerPlateRecipes, compoundRecipe } from "./mockRecipes";
import { baseTags } from "./mockTypes";

export class MockDB implements DBConnection {
    ready: boolean;
    recipeList: Array<Recipe>
    tagList: Array<Tag>

    constructor() {
        this.ready = false
        this.recipeList = [
            basicRecipe,
            compoundRecipe,
            ...boilerPlateRecipes
        ]
        this.tagList = baseTags
    }

    connect(_: string): Promise<void> {
        this.ready = true
        return Promise.resolve()
    }

    addRecipe(recipe: Recipe): Promise<RecipeThumbnail> {
        this.recipeList.push(recipe)
        let thumbnail = {
            'id': recipe.id,
            'title':  recipe.title,
            'media':  '/src/static/debug/recipeThumbnail.jpg'
        }
        return Promise.resolve(thumbnail)
    }
    

    listAllRecipes(): Promise<Array<RecipeThumbnail>> {
        let thumbList = []
        for (let recipe of this.recipeList){
            thumbList.push({'id': recipe.id,
                'title':  recipe.title,
                'media':  '/src/static/debug/recipeThumbnail.jpg'
            })
        }
        return Promise.resolve(thumbList)
    }

    getRecipe(recipeId: number): Promise<Recipe> {
        console.log(recipeId)
        const idx = this.recipeList.findIndex((r) => r.id === recipeId)
        return Promise.resolve(this.recipeList[idx])
    }

    getAllTags(): Promise<Tag[]> {
        return Promise.resolve(this.tagList)
    }
}