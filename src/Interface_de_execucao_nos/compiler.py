import json

with open('data.json') as f:
  data = json.load(f)

defstringfunction = ""

for struct in data:
    if struct['type'] == 'function':
        defstringfunction = defstringfunction[:-1]
        defstringfunction = defstringfunction+ "def "+struct['label']+"():\n\t"
        for functionsup in struct['value']:
            if functionsup['type'] == 'internalFunction':
                if functionsup['label'] == 'mostre': 
                    defstringfunction = defstringfunction + "print("+functionsup['value'][0]['value']+")\n\t"
                elif functionsup['label'] == 'ler': 
                        defstringfunction = defstringfunction + functionsup['value'][0]['label']+" = input()\n\t"
        

# print(defstringfunction)


exec(defstringfunction)
exec("inicio() ")