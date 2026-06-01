import sys, json
data = json.load(sys.stdin)
for a in data:
    print(f"{a['name']} {a['uuid']} {a['fqdn']}")
