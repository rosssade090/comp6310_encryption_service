
import Methods as mtd
import sys



val = mtd.create_string(sys.argv[1:])


cipher = mtd.random_monoalpha_cipher()
encrypted = mtd.encrypt_with_monoalpha(val, cipher)
print([encrypted ,cipher])









