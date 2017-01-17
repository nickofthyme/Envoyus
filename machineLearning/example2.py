import json
import pickle
import dill as pickle
import random
import re

from nltk import NaiveBayesClassifier, classify, MaxentClassifier
import os.path
from pprint import pprint
import nltk
import numpy
import re

# Loads the serialized NEChunkParser object
chunker = nltk.data.load('chunkers/maxent_ne_chunker/english_ace_multiclass.pickle')

# The MaxEnt classifier
maxEnt = chunker._tagger.classifier()

def maxEnt_report():
    maxEnt = chunker._tagger.classifier()
    print("These are the labels used by the NLTK\'s NEC:\n")
    print(maxEnt.labels())
    print("These are the most informative features found in the ACE corpora:\n")
    print(maxEnt.show_most_informative_features())

def ne_report(sentence, report_all=False):
    tokens = nltk.word_tokenize(sentence)
    tagged_tokens = nltk.pos_tag(tokens)
    tags = []
    for i in range(len(tagged_tokens)):
        featureset = chunker._tagger.feature_detector(tagged_tokens, i, tags)
        tag = chunker._tagger.choose_tag(tagged_tokens, i, tags)
        if tag != 'O' or report_all:
            print ('\nExplanation on the why the word \'' + tagged_tokens[i][0] + '\' was tagged:')
            featureset = chunker._tagger.feature_detector(tagged_tokens, i, tags)
            maxEnt.explain(featureset)
        tags.append(tag)

maxEnt_report()
ne_report('I am very excited about the next generation of Apple products.')
