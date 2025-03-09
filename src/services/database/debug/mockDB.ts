import type { Recipe } from "@/types/Recipe";
import type { DBConnection } from "../dbInterface";
import type { RecipeThumbnail } from "@/types/RecipeThumbnail";

export class MockDB implements DBConnection {
    ready: boolean;
    recipeList: Array<Recipe>

    constructor() {
    this.ready = false
    this.recipeList = [{
        id: 0,
        title: "Recipe a",
        media: [],
        category: [],
        tags: [],
        tools: [],
        ingredients:[],
        directions: [],
        components: []
      },{
        id: 1,
        title: "Recipe B",
        media: [],
        category: [],
        tags: [],
        tools: [],
        ingredients:[],
        directions: [],
        components: []
      },{
        id: 2,
        title: "Recipe C",
        media: [],
        category: [],
        tags: [],
        tools: [],
        ingredients:[],
        directions: [],
        components: []
      },{
        id: 3,
        title: "Recipe d",
        media: [],
        category: [],
        tags: [],
        tools: [],
        ingredients:[],
        directions: [],
        components: []
      },{
        id: 4,
        title: "Recipe e",
        media: [],
        category: [],
        tags: [],
        tools: [],
        ingredients:[],
        directions: [],
        components: []
      },{
        id: 5,
        title: "Recipe f",
        media: [],
        category: [],
        tags: [],
        tools: [],
        ingredients:[],
        directions: [],
        components: []
      },{
        id: 6,
        title: "Recipe g",
        media: [],
        category: [],
        tags: [],
        tools: [],
        ingredients:[],
        directions: [],
        components: []
      }
    ]

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

    /*insertRecipe(recipe: Recipe): Promise<recipeThumbnailType> {
        this.recipeList.push(recipe)
        let thumbnail = {
            'id': recipe.id,
            'title':  recipe.title,
            'media':  '/src/static/debug/recipeThumbnail.jpg'
        }
        return Promise.resolve(thumbnail)
    }*/

}