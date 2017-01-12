import json
import pickle
import dill as pickle
import random
import re

from nltk import NaiveBayesClassifier, classify, MaxentClassifier
import os.path

# FEATURES
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

def file_exists(path):
    return os.path.isfile(path)


# CLASSIFIERS
def train_spec_classifier():
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
        perSpec = ([(spec, key) for key, spec in listing.items()])
        specs += perSpec

    random.shuffle(specs)

    featuresets = [(spec_features(s), label) for (s, label) in specs]
    print(len(featuresets))
    train_set, test_set = featuresets[:], featuresets[1200:]



    nb_classifier = NaiveBayesClassifier.train(train_set)
    # nb_classifier.classify(string)
    # nb_classifier.prob_classify(string)
    print(classify.accuracy(nb_classifier, test_set))
    nb_classifier.show_most_informative_features(10)

    def classifier(s):
        prob_dist = nb_classifier.prob_classify(spec_features(s))
        all_prob = map(lambda sample: (sample, prob_dist.prob(sample)), prob_dist.samples())
        return list(reversed(sorted(all_prob, key=lambda tup: tup[1])))

    return classifier

def spec_classifier(s):
    if file_exists('spec_classifier.pkl'):
        print('Loading spec classifier from pickle')
        f = open('spec_classifier.pkl', 'rb')
        classifier = pickle.load(f)
        f.close()
        return classifier(s)
    else:
        print('Training new spec classifier...')
        classifier = train_spec_classifier()
        f = open('spec_classifier.pkl', 'wb')
        pickle.dump(classifier, f)
        f.close()
        return classifier(s)

print(spec_classifier('8GB'))
