from recipe import *
import os

# specify the directory path
path = './recipes'

# get a list of all files (excluding hidden files) in the directory
files = [f for f in os.listdir(path) if f.endswith('.md')]

recipes = []
# iterate through each file and read its contents
for file in files:
    # construct the full file path
    file_path = os.path.join(path, file)
    recipes.append(Recipe(file_path))

for recipe in recipes:
   recipe.debug()

# parse all recipes

# parse all components
