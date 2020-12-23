nome = ""
ano_nascimento = ""
print('Informe o nome')
t = input() 
try: 
	nome = float(t)
except :
	nome = t
print('informe o ano de nascimento')
t = input() 
try: 
	ano_nascimento = float(t)
except :
	ano_nascimento = t
print(nome*3,'a sua idade e',(2020-ano_nascimento))
t = input() 
try: 
	value = float(t)
except :
	value = t
