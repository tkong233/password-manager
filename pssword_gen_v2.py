from hashlib import sha256

def get_hashdigest(salt, plaintext):
	return sha256(salt + plaintext).hexdigest()

SECRET_KEY = 'g3tasc9sa7klhxi'

def make_password(plaintext, service):
	salt = get_hexdigest(SECRET_KEY, service)[:20]
    hsh = get_hexdigest(salt, plaintext)
    return ''.join((salt, hsh))

ALPHABET = ('abcdefghijklmnopqrstuvwxyz'
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            '0123456789!@#$%^&*()-_')

def password(plaintext, service, length=10, alphabet=ALPHABET):
    raw_hexdigest = make_password(plaintext, service)

    # Convert the hexdigest into decimal
    num = int(raw_hexdigest, 16)

    # What base will we convert `num` into?
    num_chars = len(alphabet)

    # Build up the new password one "digit" at a time,
    # up to a certain length
    chars = []
    while len(chars) < length:
        num, idx = divmod(num, num_chars)
        chars.append(alphabet[idx])

    return ''.join(chars)

    