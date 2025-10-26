#!/usr/bin/env python3
"""
Quick test script for rate limiting
Usage: python test_rate_limit.py
"""

import requests
import time

API_URL = "http://localhost:8000"

def test_rate_limit():
    print("Testing rate limiting...")
    print(f"API URL: {API_URL}")
    print("-" * 50)
    
    # Test health endpoint (no rate limit)
    print("\n1. Testing health endpoint (should not be rate limited)...")
    for i in range(5):
        response = requests.get(f"{API_URL}/health")
        print(f"  Request {i+1}: {response.status_code}")
    
    # Test analyze endpoint (rate limited)
    print("\n2. Testing /test endpoint (rate limited to 20/min)...")
    success_count = 0
    rate_limited_count = 0
    
    for i in range(25):
        response = requests.post(
            f"{API_URL}/test",
            json={"text": f"test message {i}"}
        )
        
        # Print rate limit headers
        if i == 0:
            print(f"\n  Rate Limit Headers:")
            print(f"  - Limit: {response.headers.get('X-RateLimit-Limit')}")
            print(f"  - Remaining: {response.headers.get('X-RateLimit-Remaining')}")
            print(f"  - Reset: {response.headers.get('X-RateLimit-Reset')}")
            print()
        
        if response.status_code == 200:
            success_count += 1
            remaining = response.headers.get('X-RateLimit-Remaining', 'N/A')
            print(f"  ✓ Request {i+1}: SUCCESS (Remaining: {remaining})")
        elif response.status_code == 429:
            rate_limited_count += 1
            retry_after = response.headers.get('Retry-After', 'N/A')
            print(f"  ✗ Request {i+1}: RATE LIMITED (Retry after: {retry_after}s)")
        else:
            print(f"  ? Request {i+1}: {response.status_code}")
        
        time.sleep(0.1)  # Small delay to avoid overwhelming the server
    
    print("\n" + "-" * 50)
    print(f"Results:")
    print(f"  - Successful: {success_count}")
    print(f"  - Rate Limited: {rate_limited_count}")
    print(f"  - Expected: ~20 successful, ~5 rate limited")
    
    if success_count <= 20 and rate_limited_count > 0:
        print("\n✅ Rate limiting is working correctly!")
    else:
        print("\n❌ Rate limiting may not be working as expected")
    
    # Test text length validation
    print("\n3. Testing text length validation...")
    long_text = "x" * 10001
    response = requests.post(
        f"{API_URL}/test",
        json={"text": long_text}
    )
    
    if response.status_code == 422:  # Validation error
        print("  ✓ Long text rejected (as expected)")
    else:
        print(f"  ✗ Unexpected response: {response.status_code}")

if __name__ == "__main__":
    try:
        test_rate_limit()
    except requests.exceptions.ConnectionError:
        print(f"❌ Could not connect to {API_URL}")
        print("Make sure the backend is running: uvicorn app.main:app --reload")
    except KeyboardInterrupt:
        print("\n\nTest interrupted by user")