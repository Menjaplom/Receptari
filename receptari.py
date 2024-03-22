# from recipe import *
import os

# specify the directory path
path = './recipes'

# get a list of all files (excluding hidden files) in the directory
files = [f for f in os.listdir(path) if f.endswith('.md')]

# iterate through each file and read its contents
for file in files:
    # construct the full file path
    file_path = os.path.join(path, file)


# parse all recipes

# parse all components
