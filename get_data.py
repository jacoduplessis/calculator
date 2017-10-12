#!/usr/bin/env python
import json

import requests

codes = [
    'utbade', 'tmpbf', 'uttop', 'utstrt', 'utmark', 'utcapp'
]

session = requests.session()

for code in codes:
    r = session.get('http://coronation.com/Funds/FundJourney/?fundCode={}'.format(code))
    data = r.json()
    fund = json.loads(data['Fund'])
    with open('data/{}.json'.format(code), 'w') as out:
        out.write(json.dumps(fund))
