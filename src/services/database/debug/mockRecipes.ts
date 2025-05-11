import type { Recipe } from "@/types/Recipe"

export const basicRecipe: Recipe = {
    id: 0,
    title: 'Mocked Recipe',
    media: [{
        url: '../../static/debug/recipeThumbnail.png',
        footer: 'some footer',
      },
      {
        url: '../../static/debug/recipeThumbnail.png',
        footer: 'second footer',
      },
      {
        url: '../../static/debug/recipeThumbnail.png',
        footer: 'second footer',
      }
    ],
    category: ['category example', 'More examples', 'Even more examples'],
    tags: [{tag: 'tag 0', color: '#0000FF'}],
    description: 'some description',
    yield: {units: 2, measure: 'portions'},
    prepTime: '10 min',
    cookTime: '30 min',
    tools: [{name:'knife'}, {name: 'spoons'}, {name: 'grinder', description: ', soul grinder'}],
    difficulty: 3,
    ingredients:[{
      name: 'ingredient 0',
      units: 0,
      measure: 'g'
    },{
      name: 'ingredient 1',
      units: 10,
      measure: ''
    }],
    directions: [{
      description: 'a very very long direction',
      media:[{url: '../../static/debug/recipeThumbnail.png' }]
    }],
    components: []
}

export const compoundRecipe: Recipe = {
    id: 1,
    title: 'Mocked Compound Recipe',
    media: [{
        url: '../../static/debug/recipeThumbnail.png',
        footer: 'some footer',
      },
      {
        url: '../../static/debug/recipeThumbnail.png',
        footer: 'second footer',
      },
    ],
    category: ['category example', 'More examples', 'Even more examples'],
    tags: [{tag: 'tag 0', color: '#0000FF'}],
    description: 'some description',
    yield: {units: 2, measure: 'portions'},
    prepTime: '10 min',
    cookTime: '30 min',
    tools: [{name:'knife'}, {name: 'spoons'}, {name: 'grinder', description: ', soul grinder'}],
    difficulty: 3,
    ingredients:[{
      name: 'ingredient 0',
      units: 0,
      measure: 'g'
    },{
      name: 'ingredient 1',
      units: 10,
      measure: ''
    }],
    directions: [{
      description: 'Do each subrecipe in the correct order.',
      media:[]
    }],
    components: [{
        id: 1,
        title: 'Component 1',
        media: [{
            url: '../../static/debug/recipeThumbnail.png',
            footer: 'some footer',
        },
        {
            url: '../../static/debug/recipeThumbnail.png',
            footer: 'second footer',
        },
        ],
        category: ['category example'],
        tags: [{tag: 'tag 0', color: '#0000FF'}],
        description: 'some description',
        yield: {units: 2, measure: 'portions'},
        prepTime: '10 min',
        cookTime: '30 min',
        tools: [{name:'knife'}, {name: 'spoons'}],
        difficulty: 3,
        ingredients:[{
            name: 'ingredient 0',
            units: 0,
            measure: 'g'
        }],
        directions: [{
            description: 'Do some stuff, you know...',
            media:[{
                url: '../../static/debug/recipeThumbnail.png',
                footer: 'second footer',
              }]
        }],
        components: []
    },
    {
        id: 2,
        title: 'Component 2',
        media: [{
            url: '../../static/debug/recipeThumbnail.png',
            footer: 'some footer',
        }],
        category: ['category example'],
        tags: [{tag: 'tag 0', color: '#0000FF'}],
        description: 'some description',
        yield: {units: 2, measure: 'portions'},
        prepTime: '10 min',
        cookTime: '30 min',
        tools: [{name: 'grinder', description: ', soul grinder'}],
        difficulty: 3,
        ingredients:[{
            name: 'ingredient 1',
            units: 10,
            measure: ''
          }],
        directions: [{
            description: '... and finish the recipe',
            media:[]
        }],
        components: []
    }]
}

export const boilerPlateRecipes= [{
  id: 2,
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
  id: 3,
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
  id: 4,
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
  id: 5,
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
  id: 6,
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
  id: 7,
  title: "Recipe g",
  media: [],
  category: [],
  yield:{},
  tags: [],
  tools: [],
  ingredients:[],
  directions: [],
  components: []
}]