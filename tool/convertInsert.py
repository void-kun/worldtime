
import json

with open('./timezone.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

table = 'wtb_Timez'

result = []
for item in data:
    offset = item['UTCName'].replace('UTC', '')
    if ':' in offset:
        offset = offset.split(':')
        offset = int(offset[0]) + (int(offset[1]) / 60)
    else:
        offset = int(offset)

    if len(item['Cities']) > 0:
        for city in item['Cities']:
            result.append("INSERT INTO wtb_Timez (utc, utc_offset, timezone, country, city) VALUES ('{}', {}, '{}', '{}', '{}');\n".format(
                item['UTCName'], offset, item['TimeZone'], item['Country'], city))
    else:
        result.append("INSERT INTO wtb_Timez (utc, utc_offset, timezone, country, city) VALUES ('{}', {}, '{}', '{}', '');\n".format(
            item['UTCName'], offset, item['TimeZone'], item['Country']))

with open('./init.sql', 'w', encoding='utf-8') as f:
    for item in result:
        f.write(item)
