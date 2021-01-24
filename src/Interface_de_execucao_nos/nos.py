name = ""
surname = ""
print('Enter the name')
t = input() 
try: 
	name = float(t)
except :
	name = t
print('Enter surmname')
t = input() 
try: 
	surname = float(t)
except :
	surname = t
print(name, surname)
t = input() 
try: 
	value = float(t)
except :
	value = t
