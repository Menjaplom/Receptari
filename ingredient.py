class Ingredient:
    '''This is the ingredient class, duh'''

    def __init__(self, line):
        ingr = line.split(': ', 1)
        self.ingredient = ingr[0]
        if len(ingr) == 1:
            self.quantity = None
            self.units = None
        else:
            q = ingr[1].strip(' ').split(' ', 1)
            if len(q) == 1:
                self.quantity = int(q[0])
                self.units = None
            else:
                try:
                    self.quantity = int(q[0])
                    self.units = q[1]
                except:
                    self.quantity = ingr[1].strip(' ')
                    self.units = None
    
    def debug(self):
        print(f'{self.ingredient}: {self.quantity} {self.units}')