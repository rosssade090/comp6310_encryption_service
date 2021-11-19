
import Methods as mtd
import sys
import json



val = mtd.create_string(sys.argv[1:])


cipher = mtd.random_monoalpha_cipher()
encrypted = mtd.encrypt_with_monoalpha(val, cipher)
dict_ = {"encrypted" : encrypted ,"cipher":  str(cipher)}
python2json = json.dumps(dict_)
print(python2json)









