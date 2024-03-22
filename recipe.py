
class Recipe:
    '''This is a recipe class'''

    def __init__(self, file_path):
        # open the file in read mode
        with open(file_path, 'r') as f:
            # read the file's contents
            lines = f.readlines()
            l = 0
            while l < len(lines):

                lines[l].startswith()
                print(str(i) + ': ' + line.rstrip('\n'))
                i += 1
