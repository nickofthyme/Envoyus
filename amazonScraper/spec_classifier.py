from classifiers import spec_classifier

# TODO scrape text for NE

test_strs = ['this is','this is a core', 'this is a core i7', 'this is a core i7 macbook', 'this is a core i7 macbook in great condition']

from pprint import pprint
for s in test_strs:
    pprint('"%s"' %  s)
    pprint(spec_classifier(s)[:4])
