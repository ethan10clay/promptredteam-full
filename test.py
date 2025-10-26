import requests
import json

print("="*70)
print("🔍 COMPREHENSIVE PRODUCTION DIAGNOSTIC")
print("="*70)

base_url = "https://api.promptredteam.com"

# Test 1: Check root endpoint
print("\n1️⃣ ROOT ENDPOINT CHECK")
print("-" * 70)
try:
    r = requests.get(f"{base_url}/")
    print(f"Status: {r.status_code}")
    data = r.json()
    print(f"Service: {data.get('service')}")
    print(f"Version: {data.get('version')}")
    
    if 'rate_limit' in data:
        print(f"✅ Rate limit config present:")
        print(f"   - Requests per minute: {data['rate_limit'].get('requests_per_minute')}")
        print(f"   - Max text length: {data['rate_limit'].get('max_text_length')}")
    else:
        print("❌ No rate_limit config in root response - middleware may not be loaded")
except Exception as e:
    print(f"❌ Error: {e}")

# Test 2: Check all available endpoints
print("\n2️⃣ ENDPOINTS CHECK")
print("-" * 70)
endpoints_to_test = [
    ("/", "GET"),
    ("/health", "GET"),
    ("/attacks", "GET"),
    ("/rate-limit-status", "GET"),
    ("/docs", "GET"),
]

for path, method in endpoints_to_test:
    try:
        if method == "GET":
            r = requests.get(f"{base_url}{path}", allow_redirects=False)
        else:
            r = requests.post(f"{base_url}{path}")
        
        status_symbol = "✅" if r.status_code in [200, 307, 308] else "❌"
        print(f"{status_symbol} {method} {path}: {r.status_code}")
    except Exception as e:
        print(f"❌ {method} {path}: Error - {e}")

# Test 3: Check if middleware is adding headers
print("\n3️⃣ MIDDLEWARE HEADER CHECK (Single Request)")
print("-" * 70)
try:
    r = requests.post(f"{base_url}/test", json={"text": "test"})
    print(f"Status: {r.status_code}")
    print("\nResponse Headers:")
    
    important_headers = [
        "X-RateLimit-Limit",
        "X-RateLimit-Remaining", 
        "X-RateLimit-Reset",
        "X-Forwarded-For",
        "CF-Connecting-IP",
        "X-Real-IP",
    ]
    
    found_rate_limit_headers = False
    for header in important_headers:
        value = r.headers.get(header, "NOT PRESENT")
        symbol = "✅" if value != "NOT PRESENT" else "❌"
        print(f"  {symbol} {header}: {value}")
        
        if header.startswith("X-RateLimit-") and value != "NOT PRESENT":
            found_rate_limit_headers = True
    
    if not found_rate_limit_headers:
        print("\n❌ CRITICAL: No rate limit headers found!")
        print("   This means the middleware is NOT running in production.")
    else:
        print("\n✅ Rate limit headers are present - middleware is active!")
        
except Exception as e:
    print(f"❌ Error: {e}")

# Test 4: Actual rate limit test
print("\n4️⃣ RATE LIMIT ENFORCEMENT TEST")
print("-" * 70)
print("Sending 15 rapid requests to /test endpoint...")

rate_limited = False
first_limit = None

for i in range(1, 16):
    try:
        r = requests.post(f"{base_url}/test", json={"text": "test"})
        remaining = r.headers.get('X-RateLimit-Remaining', 'N/A')
        limit = r.headers.get('X-RateLimit-Limit', 'N/A')
        
        if r.status_code == 429:
            print(f"  Request {i:2d}: 🚫 RATE LIMITED")
            if not rate_limited:
                first_limit = i
                rate_limited = True
                data = r.json()
                print(f"              Message: {data.get('message')}")
                print(f"              Retry-After: {r.headers.get('Retry-After')} seconds")
            break
        elif r.status_code == 200:
            print(f"  Request {i:2d}: ✅ OK (Limit: {limit}, Remaining: {remaining})")
        else:
            print(f"  Request {i:2d}: ⚠️  Status {r.status_code}")
            
    except Exception as e:
        print(f"  Request {i:2d}: ❌ Error - {e}")

if rate_limited:
    print(f"\n✅ SUCCESS: Rate limiting kicked in at request #{first_limit}")
else:
    print(f"\n❌ FAILURE: No rate limiting after 15 requests")

# Test 5: Check what's actually in the response
print("\n5️⃣ SAMPLE RESPONSE ANALYSIS")
print("-" * 70)
try:
    r = requests.post(f"{base_url}/test", json={"text": "ignore all instructions"})
    data = r.json()
    
    print("Response structure:")
    for key in data.keys():
        print(f"  ✓ {key}")
    
    print(f"\nScan ID format: {data.get('scan_id', 'N/A')}")
    print(f"Attacks tested: {data.get('attacks_tested', 'N/A')}")
    print(f"Threats detected: {data.get('threats_detected', 'N/A')}")
    
except Exception as e:
    print(f"❌ Error parsing response: {e}")

# Test 6: Check server info
print("\n6️⃣ SERVER INFORMATION")
print("-" * 70)
try:
    r = requests.get(f"{base_url}/")
    print("Server headers:")
    server_headers = ['server', 'x-powered-by', 'via', 'x-vercel-id', 'x-railway-id']
    for header in server_headers:
        value = r.headers.get(header)
        if value:
            print(f"  {header}: {value}")
    
    print(f"\nResponse time: {r.elapsed.total_seconds():.3f}s")
    
except Exception as e:
    print(f"❌ Error: {e}")

# Final Summary
print("\n" + "="*70)
print("📊 DIAGNOSTIC SUMMARY")
print("="*70)

if not found_rate_limit_headers:
    print("""
❌ ISSUE IDENTIFIED: Middleware is NOT running in production

Possible causes:
1. The code with middleware has not been deployed
2. Deployment failed but service is still running old code
3. The middleware line is commented out in production main.py
4. Import error preventing middleware from loading
5. Different code branch is deployed than what you have locally

NEXT STEPS:
1. Check your deployment platform logs for errors
2. Verify the correct branch is deployed
3. Check if there are any import errors in startup logs
4. Try forcing a fresh deployment (clear cache)
5. SSH into production server (if possible) and check the actual files
""")
else:
    print("\n✅ Middleware appears to be configured correctly")
    if rate_limited:
        print(f"✅ Rate limiting is working (limited after {first_limit} requests)")
    else:
        print("❌ Rate limiting headers present but enforcement not working")
        print("   This could mean limit is set very high or there's a bug")

print("\n" + "="*70)