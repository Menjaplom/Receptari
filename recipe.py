
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
                        self.version = content.rstrip('\n')
                    case 'title':
                        self.title = content.rstrip('\n')
                    case 'image':
                        self.image = content.rstrip('\n')
                    case 'recipeCategory':
                        self.recipe_category = content.rstrip('\n').split(' ')
                    case 'tags':
                        self.tags = content.rstrip('\n').split(' ')
                    case 'recipeYield':
                        self.recipe_yield = content.rstrip('\n')
                    case 'prepTime':
                        self.prep_time = content.rstrip('\n')
                    case 'cookTime':
                        self.cook_time = content.rstrip('\n')
                    case 'ingredients':
                        self.ingredients = 'TODO:'
                    case 'directions':
                        self.directions = []
                        dir = lines[l + 1].rstrip('\n')
                        while dir[0:2] == '- ':
                            self.directions.append(dir[2:])
                            l += 1
                            dir = lines[l + 1].rstrip('\n')
                    case _:
                        ()
                l += 1

    def debug(self):
        print('version' + str(self.version))
        print('title' + str(self.title))
        print('image' + str(self.image))
        print('recipeCategory' + str(self.recipe_category))
        print('tags' + str(self.tags))
        print('recipeYield' + str(self.recipe_yield))
        print('prepTime' + str(self.prep_time))
        print('cookTime' + str(self.cook_time))
        print('ingredients' + str(self.ingredients))
        print('directions' + str(self.directions))
