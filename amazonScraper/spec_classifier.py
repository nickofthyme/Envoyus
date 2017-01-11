from classifiers import spec_classifier
from pprint import pprint
from copy import deepcopy

# TODO scrape text for NE

test_str = 'this is a core i7 macbook in great condition'
test_strs = ['this is a core i7 macbook in great condition']


def spec_parser(str, clfyr, verbose=False, acc_tol=.5):
    words = str.split()
    final_specs = {}
    for i, word in enumerate(words):
        sub_str = ' '.join(words[:i+1])
        if verbose: pprint('%s | %s' % (word, sub_str))
        pos_specs = clfyr(sub_str)[:2]
        if verbose: print(pos_specs)
        for spec_tuple in pos_specs:
            max_acc = final_specs.get(spec_tuple[0], {}).get('accuracy', 0)
            try: cur_spec = spec_tuple[0]
            except: cur_spec = None
            try: cur_acc = spec_tuple[1]
            except: max_acc = 0
            # print('spec ->',cur_spec)
            # print('max acc ->',max_acc)

            if all([cur_acc > acc_tol, max_acc < cur_acc]):
                final_specs[cur_spec] = {
                    'accuracy': cur_acc,
                    'string': sub_str
                }
    spec_reducer(final_specs, clfyr, acc_tol)
    return final_specs


def spec_reducer(final_specs, clfyr, acc_tol):
    for cur_spec in final_specs:
        str = final_specs.get(cur_spec, {}).get('string', '')
        max_acc = final_specs.get(cur_spec, {}).get('accuracy', 0)
        words = str.split()
        final_spec_info = final_specs
        for i, word in enumerate(words):
            red_str = ' '.join(words[i:])
            top_spec = clfyr(red_str)[0]
            cur_acc = top_spec[1] if top_spec[0] == cur_spec else 0
            if all([cur_acc > acc_tol, max_acc < cur_acc]):
                final_spec_info[cur_spec] = {
                    'accuracy': cur_acc,
                    'string': red_str
                }
    return final_specs

specs = spec_parser(test_str, spec_classifier)#, True)

pprint(specs)





test = {'Product Name': {'accuracy': 0.8781193618679995, 'string': 'this is a core i7 macbook'}}

def spec_obj_reducer(spec_obj, clfyr, acc_tol=.5):
    for spec in spec_obj: cur_spec = spec
    str = spec_obj.get(cur_spec, {}).get('string', '')
    max_acc = spec_obj.get(cur_spec, {}).get('accuracy', 0)
    words = str.split()
    final_spec_info = spec_obj # deepcopy(spec_obj) # if don't want to mutate input dict
    for i, word in enumerate(words):
        red_str = ' '.join(words[i:])
        top_spec = clfyr(red_str)[0]
        cur_acc = top_spec[1] if top_spec[0] == cur_spec else 0
        if all([cur_acc > acc_tol, max_acc < cur_acc]):
            final_spec_info[cur_spec] = {
                'accuracy': cur_acc,
                'string': red_str
            }
        pprint(final_spec_info[cur_spec])
        # pprint('spec: %s \n\t\t=> accuracy = %s \n\t\t=> string = %s' % (top_spec, cur_acc, red_str))
    return final_spec_info

# spec_obj_reducer(test, spec_classifier)



























#
