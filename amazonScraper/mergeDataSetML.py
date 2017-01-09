# Code to merge many objects with a 1-1 key-propery to one object
# with 1-M key-properties

import json
import pickle
import dill as pickle
import random
import re

from nltk import NaiveBayesClassifier, classify
# from pprint import pprint
# from collections import defaultdict

with open('mbp.json') as data_file:
    mbpj = json.load(data_file)
with open('mbair.json') as data_file:
    mbairj = json.load(data_file)
with open('delllaptop.json') as data_file:
    dellj = json.load(data_file)
with open('tablets.json') as data_file:
    tabletj = json.load(data_file)

specs = []
for listing in (mbpj):
    # print(listing)
    perSpec = ([(spec, key) for key, spec in listing.items()])
    specs += perSpec



random.shuffle(specs)

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
    # words = word_tokenize(s)

    # for word in words:
        # features['has(%s)' % word] = word in words

    # for letter in 'abcdefghijklmnopqrstuvxyz':
        # features["count(%s)" % letter] = s.count(letter)
        # features["has(%s)" % letter] = (letter in s)

    return features

featuresets = [(spec_features(s), label) for (s, label) in specs]
print(len(featuresets))
train_set, test_set = featuresets[:], featuresets[1200:]



nb_classifier = NaiveBayesClassifier.train(train_set)
# me_classifier = MaxentClassifier.train(train_set)

# def save_obj(obj, filename):
#     with open(filename, 'wb') as output:
#         pickle.dump(obj, output)
# save_obj(nb_classifier, 'spec_classifier.pkl')
print(classify.accuracy(nb_classifier, test_set))
print(nb_classifier.show_most_informative_features(10))
# print(classify.accuracy(me_classifier, test_set))

def classifier(s):
    return nb_classifier.classify(spec_features(s))

f = open('spec_classifier.pkl', 'wb')
pickle.dump(nb_classifier, f)
f.close()

print(nb_classifier.classify(spec_features('Intel core i7')))
print(nb_classifier.classify(spec_features('core i7')))
print(nb_classifier.classify(spec_features('i3')))
print(nb_classifier.classify(spec_features('8GB')))
print(nb_classifier.classify(spec_features('500GB')))
print(nb_classifier.classify(spec_features('1920x1080')))
print(nb_classifier.classify(spec_features('1320x800')))
print(nb_classifier.classify(spec_features('Case')))
print(nb_classifier.classify(spec_features('B01I3UQJTE')))
print(nb_classifier.classify(spec_features('Apple')))
print(nb_classifier.classify(spec_features('Asus')))
print(nb_classifier.classify(spec_features('ARM')))

# print(featuresets[:40])

# print(last_letter_ft('2.7GHz Intel Core i7'))
# print(alpha_num_ratio_ft('screen 1920x1080'))


# iris = datasets.load_iris()
# digits = datasets.load_digits()

# print(iris.data)

# clf = svm.SVC(gamma='auto', C=100.)
# clf.fit(ml_data.values(), ml_data.keys())
# # print(digits.images[0:][0])
# print(clf.predict('Apple'))


from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST'])
def hello():
    json = request.json #get_json(silent=True)
    return jsonify({'result': classifier(json['input'])})

app.run()
