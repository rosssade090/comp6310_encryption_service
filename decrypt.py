
import Methods as mtd
import sys



encryp_lst = mtd.get_encrypted_txt(sys.argv)

val = mtd.create_string(encryp_lst)






#cipher = mtd.random_monoalpha_cipher()
cipher = mtd.create_dict(sys.argv)
decrypted = mtd.decrypt_with_monoalpha(val, cipher)
print(decrypted)







