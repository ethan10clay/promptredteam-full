import requests

print("🔍 Debugging Production Rate Limiter\n")

# Test 1: Check if rate-limit-status endpoint exists
print("Test 1: Checking rate limit status endpoint...")
try:
    response = requests.get('https://api.promptredteam.com/rate-limit-status')
    if response.status_code == 200:
        print("✅ Endpoint exists")
        print(f"   Response: {response.json()}")
    elif response.status_code == 404:
        print("❌ Endpoint not found - rate limiter may not be deployed")
    else:
        print(f"⚠️ Unexpected status: {response.status_code}")
except Exception as e:
    print(f"❌ Error: {e}")

print("\n" + "="*60 + "\n")

# Test 2: Check rate limit headers on /test endpoint
print("Test 2: Checking for rate limit headers...")
response = requests.post(
    'https://api.promptredteam.com/test',
    json={'text': 'test'}
)

print(f"Status code: {response.status_code}")
print(f"Headers:")
print(f"  X-RateLimit-Limit: {response.headers.get('X-RateLimit-Limit', 'NOT PRESENT ❌')}")
print(f"  X-RateLimit-Remaining: {response.headers.get('X-RateLimit-Remaining', 'NOT PRESENT ❌')}")
print(f"  X-RateLimit-Reset: {response.headers.get('X-RateLimit-Reset', 'NOT PRESENT ❌')}")

if not response.headers.get('X-RateLimit-Limit'):
    print("\n❌ No rate limit headers found - middleware not active!")
else:
    print("\n✅ Rate limit headers present")

print("\n" + "="*60 + "\n")

# Test 3: Rapid fire test
print("Test 3: Sending 25 rapid requests...")
for i in range(1, 26):
    response = requests.post(
        'https://api.promptredteam.com/test',
        json={'text': 'test'}
    )
    
    remaining = response.headers.get('X-RateLimit-Remaining', 'N/A')
    
    if response.status_code == 429:
        print(f"Request {i}: 🚫 RATE LIMITED (as expected after 20 requests)")
        print(f"   Message: {response.json().get('message')}")
        break
    elif response.status_code == 200:
        print(f"Request {i}: ✅ OK (Remaining: {remaining})")
    else:
        print(f"Request {i}: ⚠️ Status {response.status_code}")

if response.status_code != 429:
    print("\n❌ PROBLEM: No rate limiting occurred after 25 requests!")
    print("\nPossible causes:")
    print("1. Middleware not added in production deployment")
    print("2. Code not pushed/deployed to production")
    print("3. Different code version running in production")
    print("4. Middleware being bypassed somehow")