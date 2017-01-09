import json
import dill as pickle

import random
import re

from nltk import NaiveBayesClassifier
from nltk import classify
from pprint import pprint
from collections import defaultdict
from nltk.tokenize import word_tokenize

def last_letter_ft(s):
    return s[-1:] #{'last_letter': s[-1]}

def last_two_letters_ft(s):
    return s[-2:]#{'last_two_letters': s[-2:]}

def first_letter_ft(s):
    return s[:1]#{'first_letter': s[0]}

def first_two_letters_ft(s):
    return s[:2]#{'first_two_letters': s[:2]}

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

f = open('spec_classifier.pkl', 'rb')
nb = pickle.load(f)
f.close()

print(nb.classify(spec_features('core i5')))
