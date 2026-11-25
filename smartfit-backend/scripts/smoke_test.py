import urllib.request, urllib.parse, json, time, sys
BASE='http://127.0.0.1:8000'

def post_json(path, obj, headers=None):
    url=BASE+path
    data=json.dumps(obj).encode('utf-8')
    req=urllib.request.Request(url,data=data,headers={'Content-Type':'application/json', **(headers or {})}, method='POST')
    return urllib.request.urlopen(req)

def post_form(path, data_dict):
    url=BASE+path
    data=urllib.parse.urlencode(data_dict).encode('utf-8')
    req=urllib.request.Request(url,data=data,headers={'Content-Type':'application/x-www-form-urlencoded'}, method='POST')
    return urllib.request.urlopen(req)

# create a unique email
email=f"smoke_test_{int(time.time())}@example.com"
password='Password123!'
print('Using email', email)

# Register
try:
    r=post_json('/api/v1/auth/register', {'email': email, 'password': password})
    print('Register status', r.status)
    print('Register response', json.load(r))
except Exception as e:
    print('Register failed:', e)
    # try to continue if user exists

# Get token
try:
    r=post_form('/api/v1/auth/token', {'username': email, 'password': password})
    token_resp=json.load(r)
    print('Token response', token_resp)
    token=token_resp['access_token']
except Exception as e:
    print('Token request failed:', e)
    sys.exit(1)

headers={'Authorization': f'Bearer {token}'}

# Payload for generator
profile = {
    "gender": "male",
    "weight_kg": 80,
    "height_cm": 180,
    "age": 28,
    "activity_level": 1.55,
    "user_level": "Beginner",
    "available_equipment": ["Body Weight","Dumbbell"],
    "goal": "muscle_gain"
}

# Call generate-workout
try:
    r=post_json('/api/v1/generate-workout', profile, headers=headers)
    print('Generate-workout status', r.status)
    print(json.dumps(json.load(r), indent=2)[:2000])
except Exception as e:
    print('Generate-workout failed:', e)

# Call generate-diet
try:
    r=post_json('/api/v1/generate-diet', profile, headers=headers)
    print('Generate-diet status', r.status)
    print(json.dumps(json.load(r), indent=2)[:2000])
except Exception as e:
    print('Generate-diet failed:', e)

print('Smoke test finished')
