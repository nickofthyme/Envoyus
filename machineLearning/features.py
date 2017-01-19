import re

########################################################################
def last_letter_ft(s):
    return s[-1:]

def last_two_letters_ft(s):
    return s[-2:]

def first_letter_ft(s):
    return s[:1]

def first_two_letters_ft(s):
    return s[:2]

def alpha_num_ratio_ft(s):
    alphas = 0.
    nums = 0.01
    for c in s:
        if c in '1234567890':
            nums += 1.
        if c in 'abcdefghijklmnopqrstuvxyz':
            alphas += 1.
    return alphas/nums #{'alpha_num_ratio': alphas / nums}

def largest_number_ft(s):
    large_array = sorted(re.findall(r'(\d+)', s))[-1:]
    if len(large_array) == 1:
        return int(large_array[0])
    return -9999

def first_letter_capital_ft(s):
    first_letter = s[-1:]
    return first_letter.isupper()

def word_length_ft(s):
    return len(s)

def clchunk_features(sentence, i, history):
    word, pos = sentence[i]
    word = str(word)
    lword = word.lower()
    if i == 0:
        prevword, prevpos = "<START>", "<START>"
    else:
        prevword, prevpos = sentence[i-1]
        prevword = str(prevword)
    if i == len(sentence)-1:
        nextword, nextpos = "<END>", "<END>"
    else:
        nextword, nextpos = sentence[i+1]
        nextword = str(nextword)
    return {
            # "pos": pos,
            "word": lword,
            # "prevpos": prevpos,
            # "nextpos": nextpos,
            "prevword": prevword.lower(),
            "nextword": nextword.lower(),
            # "prevpos+pos": "%s+%s" % (prevpos, pos),
            # "pos+nextpos": "%s+%s" % (pos, nextpos), 
            "last_letter": last_letter_ft(lword),
            "last_two_letters": last_two_letters_ft(lword),
            "first_letter": first_letter_ft(lword),
            "first_two_letters": first_two_letters_ft(lword),
            "alpha_num_ratio": alpha_num_ratio_ft(lword),
            "largest_number": largest_number_ft(lword),
            "first_letter_capital": first_letter_capital_ft(word),
            "word_length": word_length_ft(word)
            }
            # "tags-since-dt": tags_since_dt(sentence, i)} 

def spec_features(s):
    s = s.lower()
    features = {
        'last_letter': last_letter_ft(s),
        'last_two_letters': last_two_letters_ft(s),
        'first_letter': first_letter_ft(s),
        'first_two_letters': first_two_letters_ft(s),
        'alpha_num_ratio': alpha_num_ratio_ft(s),
        'largest_number': largest_number_ft(s)
    }
    return features

########################################################################





