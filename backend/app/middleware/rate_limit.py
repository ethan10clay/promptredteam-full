from fastapi import Request
from fastapi.responses import JSONResponse
from collections import defaultdict
from typing import Dict, List
import time

# In-memory storage (resets on server restart)
# For production, use Redis
class RateLimiter:
    def __init__(self, requests_per_minute: int = 20, max_text_length: int = 1000):
        self.requests_per_minute = requests_per_minute
        self.max_text_length = max_text_length
        self.ip_requests: Dict[str, List[float]] = defaultdict(list)
    
    def is_rate_limited(self, client_ip: str) -> bool:
        """Check if IP has exceeded rate limit"""
        now = time.time()
        
        # Remove requests older than 60 seconds
        self.ip_requests[client_ip] = [
            timestamp for timestamp in self.ip_requests[client_ip]
            if now - timestamp < 60
        ]
        
        # Check if limit exceeded
        if len(self.ip_requests[client_ip]) >= self.requests_per_minute:
            return True
        
        # Add current request
        self.ip_requests[client_ip].append(now)
        return False
    
    def get_remaining_requests(self, client_ip: str) -> int:
        """Get number of remaining requests for this IP"""
        now = time.time()
        recent_requests = [
            timestamp for timestamp in self.ip_requests[client_ip]
            if now - timestamp < 60
        ]
        return max(0, self.requests_per_minute - len(recent_requests))
    
    def get_reset_time(self, client_ip: str) -> int:
        """Get seconds until rate limit resets"""
        if not self.ip_requests[client_ip]:
            return 0
        
        now = time.time()
        oldest_request = min(self.ip_requests[client_ip])
        reset_time = 60 - (now - oldest_request)
        return max(0, int(reset_time))


# Global rate limiter instance
rate_limiter = RateLimiter(requests_per_minute=20, max_text_length=1000)


def get_client_ip(request: Request) -> str:
    """Get real client IP, handling various proxy configurations"""
    # Check common proxy headers in order of preference
    headers_to_check = [
        "CF-Connecting-IP",  # Cloudflare
        "X-Real-IP",         # Nginx
        "X-Forwarded-For",   # Standard
    ]
    
    for header in headers_to_check:
        value = request.headers.get(header)
        if value:
            # X-Forwarded-For can be a comma-separated list
            return value.split(",")[0].strip()
    
    # Fallback to direct connection IP
    return request.client.host


async def rate_limit_middleware(request: Request, call_next):
    """
    Middleware to enforce rate limiting on API endpoints.
    Limits: 20 requests per minute per IP
    """
    # Skip rate limiting for docs and root endpoints
    if request.url.path in ["/", "/docs", "/openapi.json", "/redoc", "/health", "/attacks"]:
        return await call_next(request)
    
    # Get client IP
    client_ip = get_client_ip(request)
    
    # DEBUG: Log the IP and request count
    print(f"🔍 Request from IP: {client_ip}")
    print(f"🔍 Current request count: {len(rate_limiter.ip_requests[client_ip])}")
    print(f"🔍 Path: {request.url.path}")
    
    # Check rate limit
    if rate_limiter.is_rate_limited(client_ip):
        reset_time = rate_limiter.get_reset_time(client_ip)
        print(f"🚫 RATE LIMITED: {client_ip}")
        
        return JSONResponse(
            status_code=429,
            content={
                "error": "Rate limit exceeded",
                "message": f"Too many requests. Please wait {reset_time} seconds or deploy your own instance.",
                "retry_after": reset_time,
                "requests_per_minute": rate_limiter.requests_per_minute,
                "documentation": "https://github.com/your-repo#deployment"
            },
            headers={
                "Retry-After": str(reset_time),
                "X-RateLimit-Limit": str(rate_limiter.requests_per_minute),
                "X-RateLimit-Remaining": "0",
                "X-RateLimit-Reset": str(int(time.time()) + reset_time)
            }
        )
    
    # Add rate limit headers to successful responses
    response = await call_next(request)
    remaining = rate_limiter.get_remaining_requests(client_ip)
    response.headers["X-RateLimit-Limit"] = str(rate_limiter.requests_per_minute)
    response.headers["X-RateLimit-Remaining"] = str(remaining)
    response.headers["X-RateLimit-Reset"] = str(int(time.time()) + 60)
    
    return response