#!/usr/bin/env python
import json

codes = [
    'utbade', 'tmpbf', 'uttop', 'utstrt', 'utmark', 'utcapp'
]

for code in codes:

    filename = 'data/{}.json'.format(code)
    with open(filename, 'r') as f:
        data = json.loads(f.read())
    series = data['FundPerformanceChartData']['ThreeYears']['FundPerformanceSeries']
    benchmark = [x['BenchMarkReturn'] for x in series]
    fund = [x['FundReturn'] for x in series]
    benchmark.reverse()
    series.reverse()
    for i, s in enumerate(series):
        s['BenchMarkReturn'] = benchmark[i]
        s['FundReturn'] = fund[i]

    with open(filename, 'w') as f:
        f.write(json.dumps(data))
