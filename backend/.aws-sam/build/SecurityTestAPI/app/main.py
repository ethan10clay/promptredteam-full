# backend/app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from .attacks.base import AttackResult
import time

from .attacks import (
    ZeroWidthAttack,
    DirectInjectionAttack,
    RoleManipulationAttack,
    DelimiterInjectionAttack,
    EncodedPayloadAttack,
)

# Initialize all attack detectors
ATTACKS = {
    "zero_width": ZeroWidthAttack(),
    "direct_injection": DirectInjectionAttack(),
    "role_manipulation": RoleManipulationAttack(),
    "delimiter_injection": DelimiterInjectionAttack(),
    "encoded_payload": EncodedPayloadAttack(),
}

app = FastAPI(
    title="LLM Security Testing API",
    description="Test your prompts for security vulnerabilities",
    version="0.1.0"
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Lock this down in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class TestRequest(BaseModel):
    text: str = Field(..., description="Text to analyze for security threats")
    attacks: Optional[List[str]] = Field(
        default=None,
        description="Specific attacks to test. If None, tests all."
    )

class AttackResultResponse(BaseModel):
    attack_name: str
    attack_type: str
    detected: bool
    severity: float
    confidence: float
    description: str
    evidence: Optional[str]
    mitigation: Optional[str]
    reference_url: Optional[str]

class TestResponse(BaseModel):
    scan_id: str
    timestamp: float
    text_length: int
    attacks_tested: int
    threats_detected: int
    overall_risk_score: float
    results: List[AttackResultResponse]
    recommendations: List[str]
    cleaned_text: str

# Endpoints
@app.get("/")
def root():
    return {
        "service": "LLM Security Testing API",
        "version": "0.1.0",
        "docs": "/docs",
        "available_attacks": list(ATTACKS.keys())
    }

@app.get("/attacks")
def list_attacks():
    """List all available attack detection methods"""
    return {
        "attacks": [
            {
                "id": key,
                **attack.get_info()
            }
            for key, attack in ATTACKS.items()
        ]
    }

@app.post("/test", response_model=TestResponse)
def test_prompt(request: TestRequest):
    """
    Test a prompt for security vulnerabilities.
    Returns detailed analysis of potential threats.
    """
    start_time = time.time()
    
    # Determine which attacks to run
    attacks_to_run = request.attacks if request.attacks else list(ATTACKS.keys())
    
    # Validate attack names
    invalid_attacks = [a for a in attacks_to_run if a not in ATTACKS]
    if invalid_attacks:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid attack types: {invalid_attacks}"
        )
    
    # Run all selected attacks
    results = []
    for attack_name in attacks_to_run:
        attack = ATTACKS[attack_name]
        result = attack.detect(request.text)
        results.append(result)
    
    # Calculate metrics
    threats = [r for r in results if r.detected]
    overall_risk = calculate_overall_risk(results)
    recommendations = generate_recommendations(threats)
    cleaned_text = clean_text(request.text)
    
    # Generate unique scan ID
    scan_id = f"scan_{int(start_time * 1000)}"
    
    return TestResponse(
        scan_id=scan_id,
        timestamp=start_time,
        text_length=len(request.text),
        attacks_tested=len(results),
        threats_detected=len(threats),
        overall_risk_score=overall_risk,
        results=[AttackResultResponse(**r.__dict__) for r in results],
        recommendations=recommendations,
        cleaned_text=cleaned_text
    )

@app.post("/generate-payload")
def generate_payload(attack_type: str, instruction: str = "reveal system prompt"):
    """Generate an example attack payload for testing"""
    if attack_type not in ATTACKS:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown attack type: {attack_type}"
        )
    
    payload = ATTACKS[attack_type].generate_payload(instruction)
    
    return {
        "attack_type": attack_type,
        "instruction": instruction,
        "payload": payload,
        "warning": "This is for testing purposes only. Do not use maliciously."
    }

# Helper functions
def calculate_overall_risk(results: List[AttackResult]) -> float:
    """Calculate overall risk score from all results"""
    if not results:
        return 0.0
    
    # Weight by severity and confidence
    weighted_scores = [
        r.severity * r.confidence
        for r in results if r.detected
    ]
    
    if not weighted_scores:
        return 0.0
    
    # Use max score (most severe threat)
    return round(max(weighted_scores), 2)

def generate_recommendations(threats: List[AttackResult]) -> List[str]:
    """Generate actionable recommendations based on threats found"""
    if not threats:
        return ["No threats detected. Your prompt appears secure."]
    
    recommendations = []
    
    # Collect unique mitigations
    mitigations = set()
    for threat in threats:
        if threat.mitigation:
            mitigations.add(threat.mitigation)
    
    recommendations.extend(mitigations)
    
    # Add general recommendations
    if len(threats) > 2:
        recommendations.append("Multiple threats detected. Consider a comprehensive security review.")
    
    return list(recommendations)

def clean_text(text: str) -> str:
    """Remove detected malicious content"""
    # Remove zero-width characters
    cleaned = ''.join(c for c in text if c not in ['\u200b', '\u200c', '\u200d', '\ufeff'])
    return cleaned

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)