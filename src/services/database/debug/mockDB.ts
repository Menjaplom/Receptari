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
        yield:{},
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
        yield:{},
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
        yield:{},
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
        yield:{},
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
        yield:{},
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
        yield:{},
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
        yield:{},
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

    getRecipe(recipeId: number): Promise<Recipe> {
      let recipe: Recipe = {
        id: 0,
        title: 'Mocked Recipe',
        media: [{url: '../../static/debug/recipeThumbnail.png',
          footer: 'some footer',
          }],
        category: ['category example'],
        tags: [{tag: 'tag 0', color: 'hex color string'}],
        description: 'some description',
        yield: {units: 2, measure: 'portions'},
        prepTime: '10 min',
        cookTime: '30 min',
        tools: [{name:'knife'}, {name: 'spoons'}, {name: 'grinder', description: ', soul grinder'}],
        difficulty: 1,
        ingredients:[{
          name: 'ingredient 0',
          units: 0,
          measure: 'g'
        }],
        directions: [{
          description: 'a very very long direction',
          media:[{url: '../../static/debug/recipeThumbnail.png' }]
        }],
        components: []

      }
      return Promise.resolve(recipe)
    }

}