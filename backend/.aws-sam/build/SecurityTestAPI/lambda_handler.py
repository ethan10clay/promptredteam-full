# backend/lambda_handler.py
from mangum import Mangum
from app.main import app

# Mangum wraps FastAPI for AWS Lambda
handler = Mangum(app)