from classifiers import spec_classifier

# TODO scrape text for NE

test_strs = ['this is','this is a core', 'this is a core i7', 'this is a core i7 macbook', 'this is a core i7 macbook in great condition']

test_str2 = 'A clean and beautiful 15.4" Apple macbook Pro A1286 series Introduced in Mid 2012 MD104LL/A with 60 days warranty! It is maxed out with 8GB RAM, huge 1.12TB dual drive and high resolution anti glare display. A perfect device for intense graphic designers and video editing.'
test_str2 = test_str2.replace(",", "")
test_str2 = test_str2.replace(",", "")
test_str2Arr = test_str2.split()


from pprint import pprint
for s in test_str2Arr:
    pprint('"%s"' %  s)
    resultTuple = spec_classifier(s)[:1]
    pprint(resultTuple)
