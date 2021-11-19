from string import ascii_letters, digits
from random import shuffle



        
def get_encrypted_txt(lst):
    length = len(lst) - 1
    index = 1
    for i in lst:
        if i == '{dict}':
            return lst[1: index -1]
        index = index +1


def return_dict(lst):
    length = len(lst) - 1
    index = 1
    for i in lst:
        if i == '{dict}':
            return lst[index: length]
        index = index +1
            
def create_dict(lst):
    
    lst = return_dict(lst)
    
    
    length = len(lst)
    dict_ = {}
    i= 0
    while i <length:
        if (i == 0 ):
            
            lst[i] = lst[i].replace('{','')
            lst[i] = lst[i].replace("'",'')
            lst[i] = lst[i].replace(':','')
            
        if(i%2 ==0):
            lst[i] = lst[i].replace("'",'')
            lst[i] = lst[i].replace(":",'')
            
        if( (i+1) == (length - 1)):
            lst[i+1] = lst[i+1].replace('}','')
            lst[i+1] = lst[i+1].replace("'",'')
        
        lst[i+1] = lst[i+1].replace("'",'')
        lst[i+1] = lst[i+1].replace(',','')
        
      
        dict_[lst[i]] = lst[i+1]
        
        i = i +2
    return dict_


def create_string(lst):
    str_val = ''
    for  i in lst:
        str_val = str_val + ' ' + i
    return str_val


monoalpha_cipher = {
                    'a': 'm',
                    'b': 'n',
                    'c': 'b',
                    'd': 'v',
                    'e': 'c',
                    'f': 'x',
                    'g': 'z',
                    'h': 'a',
                    'i': 's',
                    'j': 'd',
                    'k': 'f',
                    'l': 'g',
                    'm': 'h',
                    'n': 'j',
                    'o': 'k',
                    'p': 'l',
                    'q': 'p',
                    'r': 'o',
                    's': 'i',
                    't': 'u',
                    'u': 'y',
                    'v': 't',
                    'w': 'r',
                    'x': 'e',
                    'y': 'w',
                    'z': 'q',
                        ' ': ' ',
                    }

def random_monoalpha_cipher(pool = None):
    if pool is None:
        pool = ascii_letters + digits
    original_pool = list(pool)
    shuffled_pool = list(pool)
    shuffle(shuffled_pool)
    return dict(zip(original_pool, shuffled_pool))

def inverse_monoalpha_cipher(monoalpha_cipher):
    inverse_monoalpha = {}
    for key, value in monoalpha_cipher.items():
        inverse_monoalpha[value] = key
    return inverse_monoalpha

def encrypt_with_monoalpha(message, monoalpha_cipher):
    encrypted_message = []
    for letter in message:
        encrypted_message.append(monoalpha_cipher.get(letter, letter))
    return ''.join(encrypted_message)

def decrypt_with_monoalpha(encrypted_message, monoalpha_cipher):
    return encrypt_with_monoalpha(
        encrypted_message,
        inverse_monoalpha_cipher(monoalpha_cipher)
    )

cipher = random_monoalpha_cipher()


