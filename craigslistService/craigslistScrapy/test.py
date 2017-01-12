# lat = 0
# cityName = 'something'
# lng = 0
#
# locAccuracy = ''
#
# print('length', len([]) == 0)
#
# locAccuracy = 'high' if all([not(lat is None), not(lng is None), len(cityName)]) else 'medium' if len(cityName) else 'low'
#
#
#
# print('Test ', locAccuracy)
# str = 'http://sfbay.craigslist.org/search/sss?query=macbook'
#
# if all(x in str for x in ['craigslist.org/search/sss?query','http']):
#
#
#     print('yes')


str = 'mac book pro'
that = 'that'
this = 'this'

newstr = "you can get with %s or you could get with %s" % (this, that)
# new = str.replace ("you can get with %s or you could get with %s")

print(newstr)

arr = [1,2,3]

obj = {'name': 'test'}

arr.append(obj)
# arr += obj

print(obj)
print(arr)
