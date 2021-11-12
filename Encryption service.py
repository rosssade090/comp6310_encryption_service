
import Methods as mtd
import pyDH

def generate_shared_key():
    d1 = pyDH.DiffieHellman()
    d2 = pyDH.DiffieHellman()
    d1_pubkey = d1.gen_public_key()
    d2_pubkey = d2.gen_public_key()
    d1_sharedkey = d1.gen_shared_key(d2_pubkey)
    d2_sharedkey = d2.gen_shared_key(d1_pubkey)
    # print(d1_sharedkey == d2_sharedkey)
    return (d1_sharedkey, d2_sharedkey)


def encrypt(plain_txt):
    cipher = mtd.random_monoalpha_cipher()
    encrypted = mtd.encrypt_with_monoalpha(plain_txt, cipher)
    return encrypted


def encrypt(plain_txt):
    cipher = mtd.random_monoalpha_cipher()
    encrypted = mtd.encrypt_with_monoalpha(plain_txt, cipher)
    return encrypted


def decrypt(plain_txt):
    cipher = mtd.random_monoalpha_cipher()
    decrypted = mtd.decrypt_with_monoalpha(plain_txt, cipher)
    return decrypted







