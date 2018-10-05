
# import random
from Crypto.Random import random
import string

def pwd():
	pwd = []
	count = 4
	length = random.randint(16, 32)

	pwd += random.choice(string.ascii_uppercase)
	pwd += random.choice(string.ascii_lowercase)
	pwd += random.choice(string.digits)
	pwd += random.choice(string.punctuation)


	while count != length:
		upper = [random.choice(string.ascii_uppercase)]
		lower = [random.choice(string.ascii_lowercase)]
		num = [random.choice(string.digits)]
		symbol = [random.choice(string.punctuation)]
		everything = upper + lower + num + symbol

		pwd += random.choice(everything)
		count += 1

	random.shuffle(pwd)
	return ''.join(pwd)

print(pwd())