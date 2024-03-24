from ingredient import *

class Recipe:
    '''This is a recipe class'''

    def __init__(self, file_path):
        self.version = None
        self.title = None
        self.image = None
        self.recipe_category = []
        self.tags = []
        self.recipe_yield = None
        self.prep_time = None
        self.cook_time = None
        self.ingredients = []
        self.directions = []

        # open the file in read mode
        with open(file_path, 'r') as f:
            # read the file's contents
            lines = f.readlines()
            l = 0
            while l < len(lines):
                line = lines[l].rstrip('\n').split(':', 1)
                label = line[0]
                content = line[0] if len(line) == 1 else line[1]
                match label:
                    case 'version':
                        self.version = content.rstrip('\n').strip()
                    case 'title':
                        self.title = content.rstrip('\n').strip()
                    case 'image':
                        self.image = content.rstrip('\n').strip()
                    case 'recipeCategory':
                        self.recipe_category = content.rstrip('\n').strip().split()
                    case 'tags':
                        self.tags = content.rstrip('\n').strip().split()
                    case 'recipeYield':
                        self.recipe_yield = content.rstrip('\n').strip()
                    case 'prepTime':
                        self.prep_time = content.rstrip('\n').strip()
                    case 'cookTime':
                        self.cook_time = content.rstrip('\n').strip()
                    case 'ingredients':
                        self.ingredients = []
                        ingr = lines[l + 1].rstrip('\n').strip()
                        while ingr[0:2] == '- ':
                            self.ingredients.append(Ingredient(ingr[2:]))
                            l += 1
                            ingr = lines[l + 1].rstrip('\n').strip()
                    case 'directions':
                        self.directions = []
                        dir = lines[l + 1].rstrip('\n').strip()
                        while dir[0:2] == '- ':
                            self.directions.append(dir[2:])
                            l += 1
                            dir = lines[l + 1].rstrip('\n').strip()
                    case _:
                        pass
                l += 1

    def debug(self):
        print('version: ' + str(self.version))
        print('title: ' + str(self.title))
        print('image: ' + str(self.image))
        print('recipeCategory: ' + str(self.recipe_category))
        print('tags: ' + str(self.tags))
        print('recipeYield: ' + str(self.recipe_yield))
        print('prepTime: ' + str(self.prep_time))
        print('cookTime: ' + str(self.cook_time))
        print('ingredients:\n')
        for i in self.ingredients:
            i.debug()
        print('directions: ' + str(self.directions))
    
