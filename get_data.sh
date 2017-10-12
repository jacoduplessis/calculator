#!/bin/bash
for code in utbade tmpbf uttop utstrt utmark utcapp
do
	curl -s "http://coronation.com/Funds/FundJourney/?fundCode=$code" > ./data/$code.json
done