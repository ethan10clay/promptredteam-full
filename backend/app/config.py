# backend/app/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings"""
    
    # API Settings
    API_TITLE: str = "LLM Security Testing API"
    API_VERSION: str = "0.1.0"
    API_DESCRIPTION: str = "Test your prompts for security vulnerabilities"
    
    # CORS
    CORS_ORIGINS: list = ["*"]  # Change in production
    
    # Rate Limiting (future use)
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"

settings = Settings()