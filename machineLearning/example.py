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

tokens = nltk.word_tokenize('I am very excited about the next generation of Apple products.')
tokens = nltk.pos_tag(tokens)
pprint(tokens)

tree = nltk.ne_chunk(tokens)
pprint(tree)

tokens = nltk.word_tokenize('President Barack Obama is the 44th President of the United States of America.')
tokens = nltk.pos_tag(tokens)
pprint(tokens)
tree = nltk.ne_chunk(tokens)
iob = nltk.chunk.tree2conllstr(tree)
pprint(tree)
pprint(iob)


def conll_tag_chunks(chunk_sents):
    tag_sents = [nltk.chunk.tree2conlltags(tree) for tree in chunk_sents]
    return [[(t, c) for (w, t, c) in chunk_tags] for chunk_tags in tag_sents]
 
def ubt_conll_chunk_accuracy(train_sents, test_sents):
    train_chunks = conll_tag_chunks(train_sents)
    test_chunks = conll_tag_chunks(test_sents)
 
    u_chunker = nltk.tag.UnigramTagger(train_chunks)
    print ('u:', nltk.tag.accuracy(u_chunker, test_chunks))
 
    ub_chunker = nltk.tag.BigramTagger(train_chunks, backoff=u_chunker)
    print ('ub:', nltk.tag.accuracy(ub_chunker, test_chunks))
 
    ubt_chunker = nltk.tag.TrigramTagger(train_chunks, backoff=ub_chunker)
    print ('ubt:', nltk.tag.accuracy(ubt_chunker, test_chunks))
 
    ut_chunker = nltk.tag.TrigramTagger(train_chunks, backoff=u_chunker)
    print ('ut:', nltk.tag.accuracy(ut_chunker, test_chunks))
 
    utb_chunker = nltk.tag.BigramTagger(train_chunks, backoff=ut_chunker)
    print ('utb:', nltk.tag.accuracy(utb_chunker, test_chunks))
 
# conll chunking accuracy test
# conll_train = nltk.corpus.conll2000.chunked_sents('train.txt')
# conll_test = nltk.corpus.conll2000.chunked_sents('test.txt')
# ubt_conll_chunk_accuracy(conll_train, conll_test)
 
# treebank chunking accuracy test
# treebank_sents = nltk.corpus.treebank_chunk.chunked_sents()
# ubt_conll_chunk_accuracy(treebank_sents[:2000], treebank_sents[2000:])


# conll chunking accuracy test

from nltk.corpus import conll2000
# iobtrain = conll_tag_chunks(conll_train)
pprint(conll_train)
# pprint(iobtrain)



# ubt_conll_chunk_accuracy(conll_train, conll_test)
 
# treebank chunking accuracy test
# treebank_sents = nltk.corpus.treebank_chunk.chunked_sents()
# ubt_conll_chunk_accuracy(treebank_sents[:2000], treebank_sents[2000:])